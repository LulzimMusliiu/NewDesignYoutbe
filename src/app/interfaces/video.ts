export interface Image {
  profile: string,
  thumbnail: string
}

export interface Video {
  id: string,
  name: string,
  user: string,
  verified: boolean,
  views: string,
  time: string,
  length: string,
  image: Image
}
