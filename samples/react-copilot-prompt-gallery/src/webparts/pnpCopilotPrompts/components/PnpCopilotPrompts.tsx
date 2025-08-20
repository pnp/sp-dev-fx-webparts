/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import styles from './PnpCopilotPrompts.module.scss';
import type { IPnpCopilotPromptsProps } from './IPnpCopilotPromptsProps';
import { IPnpCopilotPromptsState, ICategoryStats } from './IPnpCopilotPromptsState';
import { DataFetcherService } from '../services/DataFetcherService';

export default class PnpCopilotPrompts extends React.Component<IPnpCopilotPromptsProps, IPnpCopilotPromptsState> {
  private _apiServiceInstance: DataFetcherService;

  public constructor(props: IPnpCopilotPromptsProps) {
    super(props);
    this.state = {
      samples: [],
      totalSamples: 0,
      categories: [],
      copiedPromptIndex: undefined,
      selectedCategory: undefined
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
            <h1>🤖 Copilot Prompts Gallery</h1>
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
                    <span className={`${styles.prerequisiteTag} ${styles.githubTag}`}>{this.renderPrerequisites(sample.Prerequisites || '')}</span>
                  </div>
                  <div className={`${styles.sampleActions}`}>
                    <button
                      className={`${styles.btn} ${styles.btnSecondary}`}
                      onClick={() => this.copyPromptToClipboard(sample.Prompt || '', index)}
                      title="Copy prompt to clipboard"
                    >
                      {this.state.copiedPromptIndex === index ? '✅ Copied!' : '📋 Copy Prompt'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
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
}
