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

interface Post {
  posts: [
    {
      id: 1;
      content: "hey";
      img_url: "";
      video_url: "";
      createdAt: "2024-11-24T14:28:23.975Z";
      updatedAt: "2024-11-24T14:28:23.975Z";
      userId: 1;
    }
  ];
  totalCount: 1;
}
