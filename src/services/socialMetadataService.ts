import { Router, Request, Response } from 'express';
import { SocialMetadataService } from '../services/socialMetadataService';

const router = Router();
const service = new SocialMetadataService();

router.get('/facebook', (req: Request, res: Response) => {
  res.status(200).json(service.getFacebookMetadata());
});

router.get('/instagram', (req: Request, res: Response) => {
  res.status(200).json(service.getInstagramMetadata());
});

router.get('/pinterest', (req: Request, res: Response) => {
  res.status(200).json(service.getPinterestMetadata());
});

router.get('/:platform', (req: Request, res: Response) => {
  const platform = req.params.platform.toLowerCase();
  const result = service.getPlatformMetadata(platform);

  if (!result) {
    return res.status(404).json({
      error: 'Platform not supported',
      supported: ['facebook', 'instagram', 'pinterest']
    });
  }

  return res.status(200).json(result);
});

export const socialRouter = router;
