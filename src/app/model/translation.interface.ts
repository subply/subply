export interface Translation {
  _id: object;
  videoId: string;
  scripts: [
    {
      raw: string;
      subplies: [
        {
          userId: String;
          translated: String;
          votes: [];
        }
      ];
    }
  ];
}
