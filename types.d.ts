interface Token {
  email: string;
  sub: string;
  id: number;
  username: string;
  expires: number;
  iat: number;
  exp: number;
  jti: string;
}

interface CustomResponse {
  message: string;
  status: number;
}

interface Post {
  posts: [
    {
      id: number;
      content: string;
      img_url: string;
      video_url: string;
      createdAt: string;
      updatedAt: string;
      userId: number;
      User: {
        id: number;
        username: string;
        email: string;
      };
    }
  ];
  totalCount: number;
}

interface Me {
  data: {
    id: number;
    email: string;
    username: string;
    createdAt: string;
    updatedAt: string;
    _count: {
      chat: number;
    };
  };
}
