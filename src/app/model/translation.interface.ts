export interface Translation {
  _id: object;
  videoId: string;
  scripts: [
    {
      raw: string;
      subplies: [
        {
          _id: String;
          userId: String;
          translated: String;
          votes: [];
        }
      ];
    }
  ];
}
