import { GraphService } from './GraphService';

export interface ITokenValidation {
  valid: boolean;
  token?: ISignatureToken;
  error?: string;
}

export interface ISignatureToken {
  id: string;
  tokenId: string;
  contractId: number;
  contractName: string;
  fileName: string;
  signerEmail: string;
  signerName: string;
  signerId: string;
  expires: string;
  used: boolean;
  driveItemId?: string;
}

export class TokenService {
  private graph: GraphService;
  private tokensListId: string;

  constructor() {
    this.graph = new GraphService();
    this.tokensListId = process.env.TOKENS_LIST_ID!;
  }

  async validateToken(tokenId: string): Promise<ITokenValidation> {
    try {
      console.log('[Token] Validating:', tokenId);

      const items = await this.graph.queryList(
        this.tokensListId,
        `fields/TokenID eq '${tokenId}'`
      );

      if (items.length === 0) {
        return { valid: false, error: 'Token not found' };
      }

      const item = items[0];

      if (item.Used === true) {
        return { valid: false, error: 'Token already used' };
      }

      if (new Date(item.Expires) < new Date()) {
        return { valid: false, error: 'Token expired' };
      }

      const token: ISignatureToken = {
        id: item.id,
        tokenId: item.TokenID,
        contractId: item.ContractID,
        contractName: item.ContractName,
        fileName: item.FileName,
        signerEmail: item.SignerEmail,
        signerName: item.SignerName,
        signerId: item.SignerID,
        expires: item.Expires,
        used: item.Used,
        driveItemId: item.DriveItemID,
      };

      console.log('[Token] Valid token for:', token.signerEmail);
      return { valid: true, token };
    } catch (error: any) {
      console.error('[Token] Validation error:', error);
      return { valid: false, error: error.message };
    }
  }

  async markTokenUsed(
    itemId: string,
    signature: string,
    signerEmail: string,
    ipAddress: string
  ): Promise<void> {
    try {
      await this.graph.updateListItem(this.tokensListId, itemId, {
        Used: true,
        Signature: signature,
        SignedDate: new Date().toISOString(),
        SignerEmail: signerEmail,
        IPAddress: ipAddress,
      });

      console.log('[Token] Marked as used:', itemId);
    } catch (error) {
      console.error('[Token] Error marking token:', error);
      throw error;
    }
  }
}