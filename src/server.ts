type SocialMetadata = {
  platform: string;
  source: string;
  collection: string;
  schema: Record<string, string>;
  data: Record<string, unknown>;
  timestamp: string;
};

export class SocialMetadataService {
  getFacebookMetadata(): SocialMetadata {
    return {
      platform: 'facebook',
      source: 'meta',
      collection: 'audience metadata',
      schema: {
        id: 'string',
        name: 'string',
        followers: 'number',
        engagement_rate: 'number',
        content_type: 'string'
      },
      data: {
        id: 'fb_001',
        name: 'Demo Facebook Audience',
        followers: 124500,
        engagement_rate: 8.6,
        content_type: 'mixed-media'
      },
      timestamp: new Date().toISOString()
    };
  }

  getInstagramMetadata(): SocialMetadata {
    return {
      platform: 'instagram',
      source: 'meta',
      collection: 'creator metadata',
      schema: {
        id: 'string',
        username: 'string',
        followers: 'number',
        reach: 'number',
        niche: 'string'
      },
      data: {
        id: 'ig_001',
        username: 'lord_metadata',
        followers: 89300,
        reach: 254000,
        niche: 'ecommerce'
      },
      timestamp: new Date().toISOString()
    };
  }

  getPinterestMetadata(): SocialMetadata {
    return {
      platform: 'pinterest',
      source: 'pinterest',
      collection: 'pin performance metadata',
      schema: {
        id: 'string',
        board_name: 'string',
        saves: 'number',
        impressions: 'number',
        trend_score: 'number'
      },
      data: {
        id: 'pin_001',
        board_name: 'Growth Marketing',
        saves: 32000,
        impressions: 780000,
        trend_score: 91
      },
      timestamp: new Date().toISOString()
    };
  }

  getPlatformMetadata(platform: string): SocialMetadata | null {
    switch (platform) {
      case 'facebook':
        return this.getFacebookMetadata();
      case 'instagram':
        return this.getInstagramMetadata();
      case 'pinterest':
        return this.getPinterestMetadata();
      default:
        return null;
    }
  }
}
