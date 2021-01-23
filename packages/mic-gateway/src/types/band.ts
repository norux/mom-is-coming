export const BAND_API_BASE_URL = 'https://openapi.band.us';
export const ALLOWED_MEMBER = ['leader', 'coleader'];

export type Paging = {
  after: string;
  limit: number;
  band_key: string;
  access_token: string;
} | null;

export interface Author {
  name: string;
  profile_image_url: string;
  description: string;
  role: string;
  member_type: string;
  member_certified: boolean;
  me: boolean;
  is_muted: boolean;
  created_at: number;
  user_key: string;
}

export interface Post {
  band_key: string;
  author: Author;
  post_key: string;
  content: string;
  comment_count: number;
  emotion_count: number;
  created_at: number;
  photos: any[];
  latest_comments: { body: string; created_at: number; Author: any }[];
}

export interface Comment {
  band_key: string;
  author: Author;
  post_key: string;
  comment_key: string;
  content: string;
  emotion_count: number;
  is_audio_included: boolean;
  created_at: number;
  photos: any;
  sticker: any;
}

export interface GetPostsResponse {
  result_code: number;
  result_data: {
    items: Post[];
    paging: {
      previous_params: Paging;
      next_params: Paging;
    };
  };
}

export interface GetPostCommentResponse {
  result_code: number;
  result_data: {
    items: Comment[];
    paging: {
      previous_params: Paging;
      next_params: Paging;
    };
  };
}
