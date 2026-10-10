export type WatchStatus = "Not-Started" | "Completed" | "On-Going" ;

type ActionGenre = "Action" | "Adventure" | "Superhero";
type EmotionsGenre = "Comedy" | "Romance" | "Slice of life" | "Drama" | "Musical";
type SuspenseGenre = "Thriller" | "Mystery" | "Horror" | "Crime" | "Psychological";
type FantasyGenre = "Fantasy" | "Sci-Fi" | "Animation" | "Supernatural";
type DocumentaryGenre = "Documentary" | "Historical" | "Other";

export type Genres = ActionGenre | EmotionsGenre | SuspenseGenre | FantasyGenre | DocumentaryGenre;

export type ContentType = "Movie" | "TV Series" | "Other";

export type WatchItem = {
    id: number,
    title: string,
    type: ContentType,
    cover?: string,
    genre: Genres[],
    status: WatchStatus,
    year: number,
    description: string,
    episodes: Episode[],
}

export type Episode = {
  id: number,
  seriesId: number,
  title: string,
  platform: string,
  link?: string,
  watched: boolean,
}

episodes: [
  {
    
  },
]
