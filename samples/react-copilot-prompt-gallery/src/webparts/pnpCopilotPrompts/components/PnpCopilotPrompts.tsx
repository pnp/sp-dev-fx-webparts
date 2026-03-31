/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import styles from './PnpCopilotPrompts.module.scss';
import type { IPnpCopilotPromptsProps } from './IPnpCopilotPromptsProps';
import { IPnpCopilotPromptsState, ICategoryStats } from './IPnpCopilotPromptsState';
import { DataFetcherService } from '../services/DataFetcherService';
import { MSGraphClientV3 } from '@microsoft/sp-http';
import { Modal, DefaultButton, PrimaryButton, TextField } from '@fluentui/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default class PnpCopilotPrompts extends React.Component<IPnpCopilotPromptsProps, IPnpCopilotPromptsState> {
  private _apiServiceInstance: DataFetcherService;

  public constructor(props: IPnpCopilotPromptsProps) {
    super(props);
    this.state = {
      samples: [],
      totalSamples: 0,
      categories: [],
      copiedPromptIndex: undefined,
      selectedCategory: undefined,
       isCalling: false,
       conversationId: undefined,
       userQuery: '',
       error: undefined,
       chatResponse: undefined,
       rawResponse: undefined,
       showPromptInputModal: false,
       currentSample: undefined,
       placeholders: [],
       placeholderValues: {},
       generatedPrompt: ''
     };

    const {
      serviceScope
    } = props;

    this._apiServiceInstance = new DataFetcherService(serviceScope);
  }

  public async componentDidMount(): Promise<void> {
    const data = await this._apiServiceInstance.loadSamples(this.props.sampleDataFileUrl);
    try {
      const categoryStats = this.calculateCategoryStats(data.Samples);
      this.setState({
        samples: data.Samples,
        totalSamples: data.Samples.length,
        categories: categoryStats
      });
    } catch (error) {
      console.error('Error loading samples:', error);
    }
  }

  public render(): React.ReactElement<IPnpCopilotPromptsProps> {

    return (
      <section className={`${styles.pnpCopilotPrompts}`}>
        <div className={`${styles.container}`}>
          <div className={`${styles.header}`}>
            <h1>🤖 PnP Copilot Prompt Gallery</h1>
            <p>Discover and reuse Copilot prompts from the Microsoft 365 & Power Platform Community</p>
            <div className={`${styles.stats}`}>
              <div className={`${styles.statItem}`}>
                <span className={`${styles.statNumber}`}>{this.state.totalSamples}</span>
                <span className={`${styles.statLabel}`}>Total Samples</span>
              </div>
              {this.state.categories.map((stat, index) => (
                <div
                  className={`${styles.statItem}`}
                  key={index}
                  onClick={() => this.handleCategoryClick(stat.name)}
                  style={{
                    cursor: 'pointer',
                    backgroundColor: this.state.selectedCategory === stat.name ? '#0078d4' : 'transparent',
                    color: this.state.selectedCategory === stat.name ? 'white' : 'inherit',
                    borderRadius: '5px',
                    transition: 'all 0.2s ease'
                  }}

                  title={`Click to filter by ${stat.name}`}
                >
                  <span className={`${styles.statNumber}`}>{stat.count}</span>
                  <span className={`${styles.statLabel}`}>{stat.name}</span>
                </div>
              ))}
            </div>
          </div>
          {this.state.selectedCategory && (
            <div style={{
              textAlign: 'center',
              margin: '20px 0',
              padding: '10px',
              backgroundColor: '#f5f5f5',
              borderRadius: '5px'
            }}>
              <span>Showing samples for: <strong>{this.state.selectedCategory}</strong></span>
              <button
                onClick={() => this.handleCategoryClick(this.state.selectedCategory!)}
                style={{
                  marginLeft: '10px',
                  padding: '5px 10px',
                  border: 'none',
                  backgroundColor: '#0078d4',
                  color: 'white',
                  borderRadius: '3px',
                  cursor: 'pointer'
                }}
              >
                Clear Filter
              </button>
            </div>
          )}
          <div className={`${styles.gallery}`}>
            {this.getFilteredSamples().map((sample, index) => (
              <div className={`${styles.sampleCard}`} key={index}>
                <a
                  href={`https://github.com/pnp/copilot-prompts/tree/main/${sample.SamplePath}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    textDecoration: 'none',
                    marginRight: '10px',
                    display: 'inline-block'
                  }}
                >
                  <h3 className={`${styles.sampleTitle}`}>{sample.Title}</h3>
                </a>
                
                <div className={`${styles.contributorInfo}`}>
                  👨‍💻 {this.parseContributors(sample.Contributors || '')} | {sample.FirstVersionDate || 'Date not available'}
                </div>
                
                {this.renderSampleImage(sample)}
                <div className={`${styles.sampleDescription}`}>
                  {sample.Description}
                </div>
                <div className={`${styles.samplePrompt}`}>
                  <strong>Prompt:</strong><br />
                  {sample.Prompt}
                </div>
                <div className={`${styles.sampleMeta}`}>
                  <div>
                    <span className={`${styles.prerequisiteTag}`}>{this.renderPrerequisites(sample.Prerequisites || '')}</span>
                  </div>
                  <div className={`${styles.sampleActions}`}>
                    <button
                      className={`${styles.btn}`}
                      onClick={() => this.copyPromptToClipboard(sample.Prompt || '', index)}
                      title="Copy prompt to clipboard"
                    >
                      {this.state.copiedPromptIndex === index ? '✅ Copied!' : '📋 Copy Prompt'}
                    </button>
                    <button
                      className={`${styles.btn}`}
                      onClick={() => this.handleTryPrompt(sample)}
                      title="Try this prompt"
                      disabled={this.state.isCalling}
                      style={{
                        marginLeft: '10px',
                        backgroundColor: '#107c10',
                        color: 'white',
                        padding: '8px 16px',
                        border: 'none',
                        borderRadius: '3px',
                        cursor: this.state.isCalling ? 'not-allowed' : 'pointer',
                        fontSize: '14px',
                        opacity: this.state.isCalling ? 0.6 : 1
                      }}
                    >
                      {this.state.isCalling ? '⏳ Processing...' : '🚀 Try this prompt'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Prompt Input Modal */}
        <Modal
          isOpen={this.state.showPromptInputModal}
          onDismiss={() => this.setState({ showPromptInputModal: false, placeholders: [], placeholderValues: {} })}
          isBlocking={false}
        >
          <div style={{ padding: '20px', maxWidth: '700px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2>Configure Prompt</h2>
              <DefaultButton
                text="Close"
                onClick={() => this.setState({ showPromptInputModal: false, placeholders: [], placeholderValues: {} })}
              />
            </div>

            {this.state.placeholders && this.state.placeholders.length > 0 && (
              <div style={{ marginBottom: '20px' }}>
                <h3>Fill in the placeholders:</h3>
                {this.state.placeholders.map((placeholder, index) => (
                  <TextField
                    key={index}
                    label={placeholder}
                    value={this.state.placeholderValues?.[placeholder] || ''}
                    onChange={(e, value) => this.handlePlaceholderChange(placeholder, value || '')}
                    placeholder={`Enter ${placeholder}`}
                    styles={{ root: { marginBottom: '15px' } }}
                  />
                ))}
              </div>
            )}

            <div style={{
              backgroundColor: '#f5f5f5',
              padding: '15px',
              borderRadius: '5px',
              marginBottom: '20px',
              maxHeight: '300px',
              overflow: 'auto',
              border: '1px solid #ddd'
            }}>
              <h4>Preview:</h4>
              <div style={{ lineHeight: '1.6', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                {this.state.generatedPrompt}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <DefaultButton
                text="Cancel"
                onClick={() => this.setState({ showPromptInputModal: false, placeholders: [], placeholderValues: {} })}
              />
              <PrimaryButton
                text="Send to Copilot"
                onClick={() => this.sendPromptToCopilot()}
              />
            </div>
          </div>
        </Modal>

        <Modal
          isOpen={!!this.state.chatResponse}
          onDismiss={() => this.setState({ chatResponse: undefined, rawResponse: undefined })}
          isBlocking={false}
        >
          <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2>Copilot Response</h2>
              <DefaultButton
                text="Close"
                onClick={() => this.setState({ chatResponse: undefined, rawResponse: undefined })}
              />
            </div>
            
            {this.state.error && (
              <div style={{
                backgroundColor: '#fee',
                color: '#c33',
                padding: '15px',
                borderRadius: '5px',
                marginBottom: '15px',
                border: '1px solid #fcc'
              }}>
                <strong>Error:</strong> {this.state.error}
              </div>
            )}

            {/* Prompt Preview */}
            <div style={{
              backgroundColor: '#e8f4fd',
              padding: '15px',
              borderRadius: '5px',
              marginBottom: '15px',
              border: '1px solid #b3d9f2',
              maxHeight: '150px',
              overflow: 'auto'
            }}>
              <h4 style={{ marginTop: 0, marginBottom: '10px', color: '#0078d4' }}>Your Prompt:</h4>
              <div style={{ lineHeight: '1.6', whiteSpace: 'pre-wrap', wordBreak: 'break-word', color: '#333', maxWidth: '100%' }}>
                {this.state.generatedPrompt || this.state.currentSample?.Prompt || 'No prompt available'}
              </div>
            </div>

            {/* Response */}
            <div style={{
              backgroundColor: '#f5f5f5',
              padding: '15px',
              borderRadius: '5px',
              maxHeight: '500px',
              overflow: 'auto',
              border: '1px solid #ddd'
            }}>
              <h4 style={{ marginTop: 0, marginBottom: '10px' }}>Copilot's Response:</h4>
              <div style={{ lineHeight: '1.6' }}>
                      {this.state.chatResponse?.messages && this.state.chatResponse.messages[1]?.text 
                        ? <ReactMarkdown remarkPlugins={[remarkGfm]}>{this.state.chatResponse.messages[1].text}</ReactMarkdown>
                        : 'No response available'}
                    </div>
            </div>
          </div>
        </Modal>
      </section>
    );
  }

  private calculateCategoryStats(samples: any[]): ICategoryStats[] {
    const stats: { [key: string]: number } = {};

    samples.forEach((sample: any) => {
      if (sample.Prerequisites) {
        if (Array.isArray(sample.Prerequisites)) {
          sample.Prerequisites.forEach((prerequisite: string) => {
            const trimmedPrerequisite = prerequisite.trim();
            stats[trimmedPrerequisite] = (stats[trimmedPrerequisite] || 0) + 1;
          });
        } else {
          const prerequisite = sample.Prerequisites.trim();
          stats[prerequisite] = (stats[prerequisite] || 0) + 1;
        }
      }
    });

    const result: ICategoryStats[] = [];
    for (const name in stats) {
      if (Object.prototype.hasOwnProperty.call(stats, name)) {
        result.push({ name, count: stats[name] });
      }
    }

    return result.sort((a: ICategoryStats, b: ICategoryStats) => b.count - a.count);
  }

  private handleCategoryClick = (categoryName: string): void => {
    if (this.state.selectedCategory === categoryName) {
      this.setState({ selectedCategory: undefined });
    } else {
      this.setState({ selectedCategory: categoryName });
    }
  };

  private getFilteredSamples = (): any[] => {
    if (!this.state.selectedCategory) {
      return this.state.samples;
    }

    return this.state.samples.filter((sample: any) => {
      if (!sample.Prerequisites) return false;

      if (Array.isArray(sample.Prerequisites)) {
        return sample.Prerequisites.some((prereq: string) =>
          prereq.trim() === this.state.selectedCategory
        );
      } else {
        return sample.Prerequisites.trim() === this.state.selectedCategory;
      }
    });
  };

  private parseContributors(contributorsString: string): JSX.Element[] {
    if (!contributorsString) return [];

    const lines = contributorsString.split(/\r?\n/).filter(line => line.trim());

    return lines.map((line, index) => {
      const match = line.match(/\[([^\]]+)\]\(([^)]+)\)/);

      if (match) {
        const [, name, url] = match;
        return (
          <span key={index}>
            {index > 0 && ', '}
            <a href={url} target="_blank" rel="noopener noreferrer">{name}</a>
          </span>
        );
      } else {
        return <span key={index}>{index > 0 && ', '}{line}</span>;
      }
    });
  }

  private renderSampleImage = (sample: any): JSX.Element | null => {
    const imageUrl = this.getFirstImageUrl(sample);

    if (!imageUrl) return null;

    const rawImageUrl = imageUrl.indexOf('github.com') !== -1 && imageUrl.indexOf('/blob/') !== -1
      ? imageUrl.replace('/blob/', '/raw/')
      : imageUrl;

    return (
      <div style={{ marginBottom: '15px' }}>
        <img
          src={rawImageUrl}
          alt="Sample demonstration"
          style={{
            width: '100%',
            maxHeight: '200px',
            objectFit: 'cover',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.3s ease'
          }}
          onError={(e) => {
            (e.target as HTMLElement).style.display = 'none';
            const noImageDiv = (e.target as HTMLElement).nextElementSibling as HTMLElement;
            if (noImageDiv) {
              noImageDiv.style.display = 'flex';
            }
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLElement).style.transform = 'scale(1.02)';
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLElement).style.transform = 'scale(1)';
          }}
        />
        <div
          style={{
            display: 'none',
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
            height: '120px',
            borderRadius: '8px',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '15px',
            color: '#666',
            fontSize: '2rem',
            border: '2px dashed #ddd'
          }}
        >
          🖼️
        </div>
      </div>
    );
  };

  private getFirstImageUrl = (sample: any): string | null => {
    if (!sample.Images) return null;

    if (Array.isArray(sample.Images) && sample.Images.length > 0) {
      return sample.Images[0].FullGitHubUrl;
    }

    if (sample.Images.FullGitHubUrl) {
      return sample.Images.FullGitHubUrl;
    }

    return null;
  };

  private renderPrerequisites(prerequisites: string | string[]): string {
    if (!prerequisites) return '';

    if (Array.isArray(prerequisites)) {
      return prerequisites.join(', ');
    }

    return prerequisites;
  }

  private copyPromptToClipboard = async (prompt: string, index: number): Promise<void> => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(prompt);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = prompt;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }

      this.setState({ copiedPromptIndex: index });

      setTimeout(() => {
        this.setState({ copiedPromptIndex: undefined });
      }, 2000);

    } catch (err) {
      console.error('Failed to copy prompt: ', err);
    }
  };


  private extractPlaceholders = (prompt: string): string[] => {
    const placeholderRegex = /[\{\[]([^\}\]]+)[\}\]]/g;
    const matches = prompt.match(placeholderRegex) || [];
    return matches.map(match => match.slice(1, -1)); // Remove { } or [ ]
  };

  private generatePrompt = (prompt: string, placeholderValues: { [key: string]: string }): string => {
    let generatedPrompt = prompt;
    for (const placeholder in placeholderValues) {
      if (placeholderValues.hasOwnProperty(placeholder)) {
        const value = placeholderValues[placeholder];
        generatedPrompt = generatedPrompt.replace(
          new RegExp(`[\\{\\[]${placeholder}[\\}\\]]`, 'g'),
          value
        );
      }
    }
    return generatedPrompt;
  };

  private handlePlaceholderChange = (placeholder: string, value: string): void => {
    const updatedValues = { ...this.state.placeholderValues, [placeholder]: value };
    const generatedPrompt = this.generatePrompt(this.state.currentSample?.Prompt || '', updatedValues);
    this.setState({ placeholderValues: updatedValues, generatedPrompt });
  };

  private handleTryPrompt = (sample: any): void => {
    const placeholders = this.extractPlaceholders(sample.Prompt || '');

    if (placeholders.length > 0) {
      // Show prompt input modal if there are placeholders
      const placeholderValues: { [key: string]: string } = {};
      placeholders.forEach(p => placeholderValues[p] = '');
      const generatedPrompt = this.generatePrompt(sample.Prompt, placeholderValues);

      this.setState({
        showPromptInputModal: true,
        currentSample: sample,
        placeholders,
        placeholderValues,
        generatedPrompt
      });
    } else {
      // Directly send if no placeholders - set the sample first
      this.setState({
        currentSample: sample,
        generatedPrompt: sample.Prompt
      }, () => {
        this.sendPromptToCopilot();
      });
    }
  };

  private sendPromptToCopilot = async (): Promise<void> => {
    const finalPrompt = this.state.generatedPrompt || this.state.currentSample?.Prompt;

    this.setState({
      userQuery: finalPrompt,
      isCalling: true,
      error: undefined,
      showPromptInputModal: false
    });

    try {
      let conversationId = this.state.conversationId;

      // Create conversation if it doesn't exist
      if (!conversationId) {
        const client: MSGraphClientV3 = await this.props.context.msGraphClientFactory.getClient('3');

      
      
        conversationId = await new Promise<string>((resolve, reject) => {
          void client
            .api('copilot/conversations')
            .version('beta')
            .post({}, (err: any, res: any) => {
              if (err) {
                reject(err);
              } else {
                this.setState({ conversationId: res?.id });
                resolve(res?.id);
              }
            });
        });
      }
    
      const client: MSGraphClientV3 = await this.props.context.msGraphClientFactory.getClient('3');

        // Build chat payload
      const chatPayload: any = {
        message: { text: finalPrompt },
        locationHint: { timeZone: "America/New_York" },

      };
    
      return new Promise<void>((resolve) => {
         client
          .api(`/copilot/conversations/${conversationId}/chat`)
          .version('beta')
          .post(chatPayload, (err: any, res: any) => {
            if (err) {
              const message = err instanceof Error ? err.message : 'Unexpected error while sending chat message.';
              this.setState({ isCalling: false, error: message });
            } else {
              this.setState({
                isCalling: false,
                chatResponse: res,
                rawResponse: JSON.stringify(res, null, 2),
                userQuery: ''
              });
            }
            resolve();
          });
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to initialize chat';
      this.setState({ isCalling: false, error: message });
    }
  };


}
