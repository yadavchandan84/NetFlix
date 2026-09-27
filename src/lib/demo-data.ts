export type DemoVideo = {
  id: string;
  slug: string;
  title: string;
  description: string;
  genres: string[];
  year: number;
  duration: string;
  maturity: string;
  gradient: string;
  posterUrl: string;
  backdropUrl?: string;
  cast: string[];
  director: string;
  trailerYouTubeId: string;
  badge?: string;
  imdbRating?: string;
  playbackId?: string;
};

export const GENRES = [
  "Trending Now",
  "Action & Adventure",
  "Comedy",
  "Horror",
  "Sci-Fi",
  "Romance",
  "Thriller",
  "Drama",
  "Animation",
  "Documentaries",
  "Crime",
  "Fantasy",
  "Western",
  "Sports",
  "Music & Musicals",
  "Kids & Family",
  "Nature",
  "History",
  "War",
  "Mystery",
] as const;

export type Genre = (typeof GENRES)[number];

// TMDB base: https://image.tmdb.org/t/p/w500{poster_path}
const P = "https://image.tmdb.org/t/p/w500";
const B = "https://image.tmdb.org/t/p/w1280";

export const videos: DemoVideo[] = [

  // ── SCI-FI ──────────────────────────────────────────────────────────────────
  {
    id: "interstellar", slug: "interstellar", title: "Interstellar",
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival. A former NASA pilot must choose between his family and the fate of the world.",
    genres: ["Sci-Fi", "Drama", "Action & Adventure"], year: 2014, duration: "2h 49m", maturity: "U/A 13+",
    gradient: "from-slate-950 via-indigo-950 to-black",
    posterUrl: P + "/yQvGrMoipbRoddT0ZR8tPoR7NfX.jpg",
    backdropUrl: B + "/8sNiAPPYU14PUepFNeSNGUTiHW.jpg",
    cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain", "Michael Caine"],
    director: "Christopher Nolan", trailerYouTubeId: "zSWdZVtXT7E", badge: "TOP 10", imdbRating: "8.7",
  },
  {
    id: "the-martian", slug: "the-martian", title: "The Martian",
    description: "An astronaut becomes stranded on Mars after his team assume him dead, and must rely on his ingenuity to find a way to signal to Earth that he is alive.",
    genres: ["Sci-Fi", "Drama", "Comedy"], year: 2015, duration: "2h 24m", maturity: "U/A 13+",
    gradient: "from-orange-900 via-red-950 to-zinc-950",
    posterUrl: P + "/5BHuvQ6p9kfc091Z8RiFNhCwL4b.jpg",
    backdropUrl: B + "/lzMS0CI3FLQYC5EgJoWeIaEt0lm.jpg",
    cast: ["Matt Damon", "Jessica Chastain", "Kristen Wiig", "Jeff Daniels"],
    director: "Ridley Scott", trailerYouTubeId: "ej3ioOneTy8", badge: "TRENDING", imdbRating: "8.0",
  },
  {
    id: "gravity", slug: "gravity", title: "Gravity",
    description: "Two astronauts work together to survive after an accident leaves them stranded in space. A stunning visual achievement that redefines the terrifying isolation of orbit.",
    genres: ["Sci-Fi", "Thriller", "Drama"], year: 2013, duration: "1h 31m", maturity: "U/A 13+",
    gradient: "from-slate-900 via-blue-950 to-black",
    posterUrl: P + "/kZ2nZw8D681aphje8NJi8EfbL1U.jpg",
    backdropUrl: B + "/a2n6bKD7qhCPCAEALgsAhWOAQcc.jpg",
    cast: ["Sandra Bullock", "George Clooney"],
    director: "Alfonso Cuarón", trailerYouTubeId: "OiTiKOy59o4", imdbRating: "7.7",
  },
  {
    id: "arrival", slug: "arrival", title: "Arrival",
    description: "A linguist is recruited to communicate with alien lifeforms after twelve mysterious spacecraft appear around the world. What she discovers will challenge everything she knows about time.",
    genres: ["Sci-Fi", "Drama", "Mystery"], year: 2016, duration: "1h 56m", maturity: "U/A 13+",
    gradient: "from-zinc-900 via-slate-800 to-gray-950",
    posterUrl: P + "/pEzNVQfdzYDzVK0XqxERIw2x2se.jpg",
    backdropUrl: B + "/8MUZz7oPXQftFTslZpRP3CVMOoq.jpg",
    cast: ["Amy Adams", "Jeremy Renner", "Forest Whitaker"],
    director: "Denis Villeneuve", trailerYouTubeId: "IshjAihAokU", badge: "TOP 10", imdbRating: "7.9",
  },
  {
    id: "dune", slug: "dune", title: "Dune",
    description: "Paul Atreides must travel to the most dangerous planet in the universe to ensure the future of his family and his people — and fulfil a destiny he never chose.",
    genres: ["Sci-Fi", "Action & Adventure", "Drama"], year: 2021, duration: "2h 35m", maturity: "U/A 13+",
    gradient: "from-amber-900 via-orange-950 to-stone-950",
    posterUrl: P + "/v1tRXZ4JtD2Iv6fjkPvT4GiwslV.jpg",
    backdropUrl: B + "/zRKQW58MBEY078AxkHxEJzUskCl.jpg",
    cast: ["Timothée Chalamet", "Zendaya", "Oscar Isaac", "Rebecca Ferguson"],
    director: "Denis Villeneuve", trailerYouTubeId: "8g18jFHCLXk", badge: "TOP 10", imdbRating: "8.0",
  },
  {
    id: "inception", slug: "inception", title: "Inception",
    description: "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O. But is any of it real?",
    genres: ["Sci-Fi", "Action & Adventure", "Thriller"], year: 2010, duration: "2h 28m", maturity: "U/A 13+",
    gradient: "from-gray-900 via-slate-800 to-zinc-950",
    posterUrl: P + "/xlaY2zyzMfkhk0HSC5VUwzoZPU1.jpg",
    backdropUrl: B + "/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg",
    cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Elliot Page", "Tom Hardy"],
    director: "Christopher Nolan", trailerYouTubeId: "YoHD9XEInc0", badge: "TOP 10", imdbRating: "8.8",
  },
  {
    id: "avatar", slug: "avatar", title: "Avatar",
    description: "A paraplegic marine dispatched to the moon Pandora becomes torn between following his orders and protecting the world he feels is his home.",
    genres: ["Sci-Fi", "Action & Adventure", "Fantasy"], year: 2009, duration: "2h 42m", maturity: "U/A 13+",
    gradient: "from-teal-900 via-cyan-950 to-blue-950",
    posterUrl: P + "/gKY6q7SjCkAU6FqvqWybDYgUKIF.jpg",
    backdropUrl: B + "/vL5LR6WdxWPjLPFRLe133jXWsh5.jpg",
    cast: ["Sam Worthington", "Zoe Saldana", "Sigourney Weaver", "Stephen Lang"],
    director: "James Cameron", trailerYouTubeId: "5PSNL1qE6VY", imdbRating: "7.9",
  },
  {
    id: "the-matrix", slug: "the-matrix", title: "The Matrix",
    description: "A computer hacker learns from mysterious rebels about the true nature of his reality. Red pill or blue pill — the choice changes everything.",
    genres: ["Sci-Fi", "Action & Adventure"], year: 1999, duration: "2h 16m", maturity: "U/A 16+",
    gradient: "from-green-950 via-emerald-900 to-black",
    posterUrl: P + "/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    backdropUrl: B + "/fNG7i7RqMErkcqhohV2a6cV1Ehy.jpg",
    cast: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss", "Hugo Weaving"],
    director: "The Wachowskis", trailerYouTubeId: "vKQi3bBA1y8", badge: "TRENDING", imdbRating: "8.7",
  },

  // ── ACTION & ADVENTURE ───────────────────────────────────────────────────────
  {
    id: "mad-max-fury-road", slug: "mad-max-fury-road", title: "Mad Max: Fury Road",
    description: "In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler in search of her homeland with the aid of female prisoners and a drifter named Max.",
    genres: ["Action & Adventure", "Sci-Fi"], year: 2015, duration: "2h 00m", maturity: "U/A 16+",
    gradient: "from-orange-800 via-red-900 to-zinc-950",
    posterUrl: P + "/ulcAi4dKpAjHwYGS08vNyx9H6I9.jpg",
    backdropUrl: B + "/gqrnQA6Xppdl8vIb2eJc58VC1tW.jpg",
    cast: ["Tom Hardy", "Charlize Theron", "Nicholas Hoult"],
    director: "George Miller", trailerYouTubeId: "hEJnMQG9ev8", badge: "TOP 10", imdbRating: "8.1",
  },
  {
    id: "top-gun-maverick", slug: "top-gun-maverick", title: "Top Gun: Maverick",
    description: "After more than thirty years of service, Pete Mitchell finds himself training a detachment of graduates for a specialized mission the likes of which no living pilot has ever seen.",
    genres: ["Action & Adventure", "Drama"], year: 2022, duration: "2h 11m", maturity: "U/A 13+",
    gradient: "from-sky-900 via-blue-950 to-zinc-950",
    posterUrl: P + "/n0YuM4f5lvGAP6MAW2kBIzugXnc.jpg",
    backdropUrl: B + "/AaV1YIdWKnjAIAOe8UUKBFm327v.jpg",
    cast: ["Tom Cruise", "Miles Teller", "Jennifer Connelly", "Val Kilmer"],
    director: "Joseph Kosinski", trailerYouTubeId: "qSqVVswa420", badge: "TOP 10", imdbRating: "8.3",
  },
  {
    id: "john-wick", slug: "john-wick", title: "John Wick",
    description: "An ex-hit-man comes out of retirement to track down the gangsters that killed his dog and took everything from him. One of the most kinetic action films ever made.",
    genres: ["Action & Adventure", "Thriller", "Crime"], year: 2014, duration: "1h 41m", maturity: "U/A 18+",
    gradient: "from-zinc-900 via-stone-800 to-black",
    posterUrl: P + "/wXqWR7dHncNRbxoEGybEy7QTe9h.jpg",
    backdropUrl: B + "/ff2ti5DkA9UYLzyqhQfI2kZqEuh.jpg",
    cast: ["Keanu Reeves", "Michael Nyqvist", "Alfie Allen", "Willem Dafoe"],
    director: "Chad Stahelski", trailerYouTubeId: "2AUmvWm5ZDQ", badge: "TRENDING", imdbRating: "7.4",
  },
  {
    id: "avengers-endgame", slug: "avengers-endgame", title: "Avengers: Endgame",
    description: "After the devastating events of Infinity War, the Avengers assemble once more to reverse Thanos's actions and restore balance to the universe.",
    genres: ["Action & Adventure", "Sci-Fi", "Fantasy"], year: 2019, duration: "3h 01m", maturity: "U/A 13+",
    gradient: "from-indigo-900 via-purple-950 to-zinc-950",
    posterUrl: P + "/ulzhLuWrPK07P1YkdWQLZnQh1JL.jpg",
    backdropUrl: B + "/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg",
    cast: ["Robert Downey Jr.", "Chris Evans", "Mark Ruffalo", "Chris Hemsworth"],
    director: "Anthony & Joe Russo", trailerYouTubeId: "TcMBFSGVi1c", imdbRating: "8.4",
  },
  {
    id: "mission-impossible-fallout", slug: "mission-impossible-fallout", title: "Mission: Impossible – Fallout",
    description: "Ethan Hunt and his IMF team race against time after a mission gone wrong. Features the most jaw-dropping practical stunts ever committed to film.",
    genres: ["Action & Adventure", "Thriller"], year: 2018, duration: "2h 27m", maturity: "U/A 13+",
    gradient: "from-slate-800 via-gray-900 to-zinc-950",
    posterUrl: P + "/AkJQpZp9WoNdj7pLYSj1L0RcMMN.jpg",
    backdropUrl: B + "/5jnoAA74Qwb5w6B9FMvnc20n6Ie.jpg",
    cast: ["Tom Cruise", "Henry Cavill", "Ving Rhames", "Simon Pegg"],
    director: "Christopher McQuarrie", trailerYouTubeId: "wb49-oV0F78", imdbRating: "7.7",
  },

  // ── ROMANCE ──────────────────────────────────────────────────────────────────
  {
    id: "la-la-land", slug: "la-la-land", title: "La La Land",
    description: "While navigating their careers in Los Angeles, a pianist and an actress fall in love while attempting to reconcile their aspirations for the future. A modern musical masterpiece.",
    genres: ["Romance", "Music & Musicals", "Drama"], year: 2016, duration: "2h 08m", maturity: "U/A 13+",
    gradient: "from-amber-700 via-rose-800 to-violet-950",
    posterUrl: P + "/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg",
    backdropUrl: B + "/nlPCdZlHtRNcF6C9hzUH4ebmV1w.jpg",
    cast: ["Ryan Gosling", "Emma Stone", "John Legend", "Rosemarie DeWitt"],
    director: "Damien Chazelle", trailerYouTubeId: "0pdqf4P9MB8", badge: "TOP 10", imdbRating: "8.0",
  },
  {
    id: "the-notebook", slug: "the-notebook", title: "The Notebook",
    description: "A poor yet passionate young man falls in love with a rich young woman, giving her a sense of freedom, but they are soon separated because of their social differences.",
    genres: ["Romance", "Drama"], year: 2004, duration: "2h 03m", maturity: "U/A 13+",
    gradient: "from-blue-800 via-indigo-900 to-slate-950",
    posterUrl: P + "/rNzQyW4f1B274UyboOyllroIQkl.jpg",
    backdropUrl: B + "/bfEIhJc4M8sqbrgKf7fBD7cxb8a.jpg",
    cast: ["Ryan Gosling", "Rachel McAdams", "James Garner", "Gena Rowlands"],
    director: "Nick Cassavetes", trailerYouTubeId: "7dbRpjlmqZs", imdbRating: "7.8",
  },
  {
    id: "pride-and-prejudice", slug: "pride-and-prejudice", title: "Pride & Prejudice",
    description: "Sparks fly when spirited Elizabeth Bennet meets single, rich, and proud Mr. Darcy who reluctantly finds himself falling in love with a woman beneath his class.",
    genres: ["Romance", "Drama", "History"], year: 2005, duration: "2h 09m", maturity: "U",
    gradient: "from-green-800 via-emerald-900 to-slate-950",
    posterUrl: P + "/o8UhmEbWPHmTUxP0lMuCoqNkbB3.jpg",
    backdropUrl: B + "/1Onam6oWyFAUCcoxtdWkACtEiNr.jpg",
    cast: ["Keira Knightley", "Matthew Macfadyen", "Judi Dench", "Donald Sutherland"],
    director: "Joe Wright", trailerYouTubeId: "1dSHB7FFXMY", badge: "TRENDING", imdbRating: "7.8",
  },
  {
    id: "titanic", slug: "titanic", title: "Titanic",
    description: "A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic. An epic romance for the ages.",
    genres: ["Romance", "Drama", "History"], year: 1997, duration: "3h 14m", maturity: "U/A 13+",
    gradient: "from-blue-900 via-slate-800 to-zinc-950",
    posterUrl: P + "/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg",
    backdropUrl: B + "/xXCuto8YVp5RFqBJ7yKmVmLOWpF.jpg",
    cast: ["Leonardo DiCaprio", "Kate Winslet", "Billy Zane", "Kathy Bates"],
    director: "James Cameron", trailerYouTubeId: "CHekzSiZjrY", imdbRating: "7.9",
  },
  {
    id: "eternal-sunshine", slug: "eternal-sunshine", title: "Eternal Sunshine of the Spotless Mind",
    description: "When their relationship turns sour, a couple undergoes a procedure to have each other erased from their memories. But as his memories dissolve, he realises he still loves her.",
    genres: ["Romance", "Sci-Fi", "Drama"], year: 2004, duration: "1h 48m", maturity: "U/A 13+",
    gradient: "from-sky-800 via-blue-900 to-indigo-950",
    posterUrl: P + "/5MwkWH9tYHv3mV9OdYTMR5qreIz.jpg",
    backdropUrl: B + "/kvXLZqY0Ngl9KGhfHIFVhbRqFgP.jpg",
    cast: ["Jim Carrey", "Kate Winslet", "Kirsten Dunst", "Mark Ruffalo"],
    director: "Michel Gondry", trailerYouTubeId: "07-QBnEKQi0", badge: "TOP 10", imdbRating: "8.3",
  },

  // ── THRILLER ─────────────────────────────────────────────────────────────────
  {
    id: "gone-girl", slug: "gone-girl", title: "Gone Girl",
    description: "With his wife's disappearance having become the focus of an intense media circus, a man sees the spotlight turned on him when it's suspected he may not be innocent.",
    genres: ["Thriller", "Mystery", "Drama"], year: 2014, duration: "2h 29m", maturity: "A",
    gradient: "from-stone-800 via-zinc-900 to-gray-950",
    posterUrl: P + "/ts996lKsxvjkO2yiYG0ht4qAicO.jpg",
    backdropUrl: B + "/iWak7wT0j6ycCc8lKr4NBz9c7n5.jpg",
    cast: ["Ben Affleck", "Rosamund Pike", "Neil Patrick Harris", "Tyler Perry"],
    director: "David Fincher", trailerYouTubeId: "8ZiTBFdLqYY", badge: "TOP 10", imdbRating: "8.1",
  },
  {
    id: "parasite", slug: "parasite", title: "Parasite",
    description: "Greed and class discrimination threaten the symbiotic relationship between the wealthy Park family and the destitute Kim clan. The first non-English film to win Best Picture.",
    genres: ["Thriller", "Drama", "Comedy"], year: 2019, duration: "2h 12m", maturity: "U/A 16+",
    gradient: "from-zinc-800 via-gray-900 to-black",
    posterUrl: P + "/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
    backdropUrl: B + "/hiKmpZMGZsrkA3cdce8a7Dpos1j.jpg",
    cast: ["Song Kang-ho", "Lee Sun-kyun", "Cho Yeo-jeong", "Choi Woo-shik"],
    director: "Bong Joon-ho", trailerYouTubeId: "5xH0HfJHsaY", badge: "TOP 10", imdbRating: "8.5",
  },
  {
    id: "se7en", slug: "se7en", title: "Se7en",
    description: "Two detectives hunt a serial killer who uses the seven deadly sins as his motives. A masterwork of dread that ends with one of cinema's most shocking finales.",
    genres: ["Thriller", "Crime", "Mystery"], year: 1995, duration: "2h 07m", maturity: "A",
    gradient: "from-gray-900 via-stone-800 to-black",
    posterUrl: P + "/191nKfP0ehp3uIvWqgPbFmI4lv9.jpg",
    backdropUrl: B + "/i5H7zusQGsysGQ8i6P361Vnr0n2.jpg",
    cast: ["Brad Pitt", "Morgan Freeman", "Kevin Spacey", "Gwyneth Paltrow"],
    director: "David Fincher", trailerYouTubeId: "znmZoVkCjpI", imdbRating: "8.6",
  },
  {
    id: "shutter-island", slug: "shutter-island", title: "Shutter Island",
    description: "In 1954, a U.S. Marshal investigates the disappearance of a murderer who escaped from a hospital for the criminally insane. Nothing — and no one — is what it seems.",
    genres: ["Thriller", "Mystery", "Drama"], year: 2010, duration: "2h 18m", maturity: "U/A 16+",
    gradient: "from-slate-900 via-zinc-800 to-black",
    posterUrl: P + "/nrmXQ0zcZUL8jFLrakWc90IR8z9.jpg",
    backdropUrl: B + "/rbZvGN1A1QyZuoKzhCw8QPmf2q0.jpg",
    cast: ["Leonardo DiCaprio", "Mark Ruffalo", "Ben Kingsley", "Michelle Williams"],
    director: "Martin Scorsese", trailerYouTubeId: "5iaYLCiq5RM", badge: "TRENDING", imdbRating: "8.2",
  },

  // ── DRAMA ────────────────────────────────────────────────────────────────────
  {
    id: "the-shawshank-redemption", slug: "the-shawshank-redemption", title: "The Shawshank Redemption",
    description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency. Widely considered one of the greatest films ever made.",
    genres: ["Drama", "Crime"], year: 1994, duration: "2h 22m", maturity: "U/A 16+",
    gradient: "from-amber-900 via-stone-800 to-zinc-950",
    posterUrl: P + "/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg",
    backdropUrl: B + "/pNjh59JSxChQktamG3LMp9ZoQzp.jpg",
    cast: ["Tim Robbins", "Morgan Freeman", "Bob Gunton", "William Sadler"],
    director: "Frank Darabont", trailerYouTubeId: "6hB3S9bIaco", badge: "TOP 10", imdbRating: "9.3",
  },
  {
    id: "forrest-gump", slug: "forrest-gump", title: "Forrest Gump",
    description: "The presidencies of Kennedy and Johnson, the Vietnam War, and other historical events unfold through the perspective of an Alabama man with an extraordinary life.",
    genres: ["Drama", "Romance", "Comedy"], year: 1994, duration: "2h 22m", maturity: "U/A 13+",
    gradient: "from-green-800 via-teal-900 to-slate-950",
    posterUrl: P + "/Cw4hIUIAmSYfK9QfaUW5igp9La.jpg",
    backdropUrl: B + "/66Kn4XWhkuPkJxOJyPEx4U2CUfN.jpg",
    cast: ["Tom Hanks", "Robin Wright", "Gary Sinise", "Sally Field"],
    director: "Robert Zemeckis", trailerYouTubeId: "bLvqoHBptjg", badge: "TOP 10", imdbRating: "8.8",
  },
  {
    id: "oppenheimer", slug: "oppenheimer", title: "Oppenheimer",
    description: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb during World War II. A towering epic about the weight of invention.",
    genres: ["Drama", "History", "Thriller"], year: 2023, duration: "3h 00m", maturity: "U/A 16+",
    gradient: "from-orange-950 via-red-900 to-zinc-950",
    posterUrl: P + "/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
    backdropUrl: B + "/neeNHeXjMF5fXoCJRsOmkNGC7q.jpg",
    cast: ["Cillian Murphy", "Emily Blunt", "Matt Damon", "Robert Downey Jr."],
    director: "Christopher Nolan", trailerYouTubeId: "uYPbbksJxIg", badge: "TOP 10", imdbRating: "8.9",
  },
  {
    id: "12-angry-men", slug: "12-angry-men", title: "12 Angry Men",
    description: "A jury holdout attempts to prevent a miscarriage of justice by forcing his colleagues to reconsider the evidence and their own prejudices in a murder trial. Essential cinema.",
    genres: ["Drama", "Crime"], year: 1957, duration: "1h 36m", maturity: "U",
    gradient: "from-zinc-700 via-stone-800 to-gray-950",
    posterUrl: P + "/zhG3vKWyDRaZYoaww1UVAi29T9h.jpg",
    backdropUrl: B + "/qqHQsStV6exghCM7zbObuYBiYxw.jpg",
    cast: ["Henry Fonda", "Lee J. Cobb", "Ed Begley", "Martin Balsam"],
    director: "Sidney Lumet", trailerYouTubeId: "Gg8BkE_PGVE", imdbRating: "9.0",
  },
  {
    id: "whiplash", slug: "whiplash", title: "Whiplash",
    description: "A promising young drummer enrolls at a cut-throat music conservatory where his dreams of greatness are mentored by an instructor who will stop at nothing to realize his potential.",
    genres: ["Drama", "Music & Musicals"], year: 2014, duration: "1h 46m", maturity: "U/A 16+",
    gradient: "from-zinc-900 via-amber-950 to-black",
    posterUrl: P + "/7fn624j5lj3xTme2SgiLCeuedmO.jpg",
    backdropUrl: B + "/fRGxZuo7jJUWQsVg9PREb98Aclp.jpg",
    cast: ["Miles Teller", "J.K. Simmons", "Melissa Benoist", "Paul Reiser"],
    director: "Damien Chazelle", trailerYouTubeId: "7d_jQycdQGo", badge: "TOP 10", imdbRating: "8.5",
  },

  // ── COMEDY ───────────────────────────────────────────────────────────────────
  {
    id: "the-grand-budapest-hotel", slug: "the-grand-budapest-hotel", title: "The Grand Budapest Hotel",
    description: "The adventures of Gustave H, a legendary concierge at a famous European hotel between the wars, and Zero Moustafa, the lobby boy who becomes his most trusted friend.",
    genres: ["Comedy", "Drama", "Mystery"], year: 2014, duration: "1h 39m", maturity: "U/A 13+",
    gradient: "from-pink-700 via-rose-800 to-violet-950",
    posterUrl: P + "/eWdyYQreja6JGCzqHWXpWHDrrPo.jpg",
    backdropUrl: B + "/jK65srQczOKTpW62wPxwwKztGgE.jpg",
    cast: ["Ralph Fiennes", "Tony Revolori", "Saoirse Ronan", "Bill Murray"],
    director: "Wes Anderson", trailerYouTubeId: "1Fg5iWmQjwk", badge: "TRENDING", imdbRating: "8.1",
  },
  {
    id: "superbad", slug: "superbad", title: "Superbad",
    description: "Two co-dependent high school seniors deal with separation anxiety after their college plans fall through. Hilarious, heartfelt, and relentlessly funny.",
    genres: ["Comedy"], year: 2007, duration: "1h 53m", maturity: "A",
    gradient: "from-yellow-700 via-amber-800 to-zinc-950",
    posterUrl: P + "/ek8e8txUyUwd2BNqj6lFEerJfbq.jpg",
    backdropUrl: B + "/coru98UcFBzJIU7bxZguxaePgu0.jpg",
    cast: ["Jonah Hill", "Michael Cera", "Emma Stone", "Seth Rogen"],
    director: "Greg Mottola", trailerYouTubeId: "4eGRMBNZWXU", imdbRating: "7.6",
  },
  {
    id: "knives-out", slug: "knives-out", title: "Knives Out",
    description: "A detective investigates the death of a patriarch of an eccentric, combative family. A wickedly clever mystery that keeps you guessing — then pulls the rug out again.",
    genres: ["Comedy", "Mystery", "Thriller"], year: 2019, duration: "2h 10m", maturity: "U/A 16+",
    gradient: "from-amber-800 via-stone-800 to-zinc-950",
    posterUrl: P + "/pThyQovXQrw2m0s9x82twj48Jq4.jpg",
    backdropUrl: B + "/4HWAQu28e2yaWrtupFPGFkdNU7V.jpg",
    cast: ["Daniel Craig", "Chris Evans", "Ana de Armas", "Jamie Lee Curtis"],
    director: "Rian Johnson", trailerYouTubeId: "qGqiHJTsRkQ", badge: "NEW", imdbRating: "7.9",
  },

  // ── HORROR ───────────────────────────────────────────────────────────────────
  {
    id: "get-out", slug: "get-out", title: "Get Out",
    description: "A young African-American visits his white girlfriend's parents for the weekend, where his simmering uneasiness about their reception of him eventually reaches a boiling point.",
    genres: ["Horror", "Thriller", "Mystery"], year: 2017, duration: "1h 44m", maturity: "A",
    gradient: "from-green-950 via-emerald-900 to-black",
    posterUrl: P + "/tFXcEccSQMf3lfhfXKSU9iRBpa3.jpg",
    backdropUrl: B + "/bBQHALHRAaaORlPNXv7fNcRXYdx.jpg",
    cast: ["Daniel Kaluuya", "Allison Williams", "Bradley Whitford", "Catherine Keener"],
    director: "Jordan Peele", trailerYouTubeId: "DzfpyUB60YY", badge: "TOP 10", imdbRating: "7.7",
  },
  {
    id: "hereditary", slug: "hereditary", title: "Hereditary",
    description: "When the matriarch of the Graham family passes away, her daughter's family begins to unravel cryptic and terrifying secrets about their ancestry.",
    genres: ["Horror", "Drama", "Mystery"], year: 2018, duration: "2h 07m", maturity: "A",
    gradient: "from-slate-950 via-stone-900 to-black",
    posterUrl: P + "/4GFPuL14eXi66V96xBWY73Y9PfR.jpg",
    backdropUrl: B + "/gJbTXKNTL6O7r7PzF6ZRkJGBlPp.jpg",
    cast: ["Toni Collette", "Gabriel Byrne", "Alex Wolff", "Milly Shapiro"],
    director: "Ari Aster", trailerYouTubeId: "V6wWKNij_1M", badge: "TRENDING", imdbRating: "7.3",
  },
  {
    id: "a-quiet-place", slug: "a-quiet-place", title: "A Quiet Place",
    description: "In a post-apocalyptic world, a family is forced to live in near silence while hiding from creatures that hunt by sound. A masterclass in tension and non-verbal storytelling.",
    genres: ["Horror", "Thriller", "Sci-Fi"], year: 2018, duration: "1h 30m", maturity: "U/A 13+",
    gradient: "from-zinc-900 via-neutral-800 to-black",
    posterUrl: P + "/nAU74GmpUk7t5iklEp3bufwDq4n.jpg",
    backdropUrl: B + "/roYyPiQOHnqpCVWVAmtBnekqZwM.jpg",
    cast: ["Emily Blunt", "John Krasinski", "Millicent Simmonds", "Noah Jupe"],
    director: "John Krasinski", trailerYouTubeId: "WR7cc5t7tv8", imdbRating: "7.5",
  },

  // ── ANIMATION ────────────────────────────────────────────────────────────────
  {
    id: "spirited-away", slug: "spirited-away", title: "Spirited Away",
    description: "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits, and where humans are changed into beasts.",
    genres: ["Animation", "Fantasy", "Kids & Family"], year: 2001, duration: "2h 05m", maturity: "U",
    gradient: "from-teal-700 via-cyan-800 to-indigo-900",
    posterUrl: P + "/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg",
    backdropUrl: B + "/lP4FbqKjAjMJGBF7HjYhUNcYcxt.jpg",
    cast: ["Voice: Daveigh Chase", "Voice: Suzanne Pleshette", "Voice: Jason Marsden"],
    director: "Hayao Miyazaki", trailerYouTubeId: "ByXuk9QqQkk", badge: "TOP 10", imdbRating: "8.6",
  },
  {
    id: "spider-man-into-the-spider-verse", slug: "spider-man-into-the-spider-verse", title: "Spider-Man: Into the Spider-Verse",
    description: "Teen Miles Morales becomes the Spider-Man of his universe and must join five spider-powered individuals from other dimensions to stop a threat to all realities.",
    genres: ["Animation", "Action & Adventure", "Sci-Fi"], year: 2018, duration: "1h 57m", maturity: "U/A 13+",
    gradient: "from-violet-700 via-purple-800 to-indigo-950",
    posterUrl: P + "/iiZZdoQBEYBv6id8su7ImL0oCbD.jpg",
    backdropUrl: B + "/1ntePsIqeklfmrQJqZPncCydsqY.jpg",
    cast: ["Voice: Shameik Moore", "Voice: Hailee Steinfeld", "Voice: Oscar Isaac"],
    director: "Peter Ramsey, Bob Persichetti, Rodney Rothman", trailerYouTubeId: "g4Hbz2jLxvQ", badge: "TOP 10", imdbRating: "8.4",
  },
  {
    id: "toy-story", slug: "toy-story", title: "Toy Story",
    description: "A cowboy doll is threatened when a new spaceman figure supplants him as top toy. The film that launched Pixar and changed animation forever.",
    genres: ["Animation", "Kids & Family", "Comedy"], year: 1995, duration: "1h 21m", maturity: "U",
    gradient: "from-sky-600 via-blue-700 to-indigo-900",
    posterUrl: P + "/uXDfjJbdP4ijW5hWSBrPrlKpxab.jpg",
    backdropUrl: B + "/3Rfvhy1Nl6sSGJwyjb0QiZzZYlB.jpg",
    cast: ["Voice: Tom Hanks", "Voice: Tim Allen", "Voice: Don Rickles"],
    director: "John Lasseter", trailerYouTubeId: "KYz2wyBy3kc", imdbRating: "8.3",
  },

  // ── CRIME ────────────────────────────────────────────────────────────────────
  {
    id: "the-godfather", slug: "the-godfather", title: "The Godfather",
    description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son. Widely regarded as the greatest film ever made.",
    genres: ["Crime", "Drama"], year: 1972, duration: "2h 55m", maturity: "A",
    gradient: "from-zinc-900 via-amber-950 to-black",
    posterUrl: P + "/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
    backdropUrl: B + "/tSPT36ZKlP2WVHJLM4cQPLSzv3b.jpg",
    cast: ["Marlon Brando", "Al Pacino", "James Caan", "Diane Keaton"],
    director: "Francis Ford Coppola", trailerYouTubeId: "sY1S34973zA", badge: "TOP 10", imdbRating: "9.2",
  },
  {
    id: "pulp-fiction", slug: "pulp-fiction", title: "Pulp Fiction",
    description: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption. Tarantino's tour de force.",
    genres: ["Crime", "Drama", "Thriller"], year: 1994, duration: "2h 34m", maturity: "A",
    gradient: "from-yellow-800 via-orange-900 to-zinc-950",
    posterUrl: P + "/vQWk5YBFWF4bZaofAbv0tShwBvQ.jpg",
    backdropUrl: B + "/suaEOtk1N1sgg2MTM7oZd2cfVp3.jpg",
    cast: ["John Travolta", "Samuel L. Jackson", "Uma Thurman", "Bruce Willis"],
    director: "Quentin Tarantino", trailerYouTubeId: "s7EdQ4FqbhY", badge: "TRENDING", imdbRating: "8.9",
  },
  {
    id: "goodfellas", slug: "goodfellas", title: "Goodfellas",
    description: "The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners Jimmy Conway and Tommy DeVito.",
    genres: ["Crime", "Drama"], year: 1990, duration: "2h 25m", maturity: "A",
    gradient: "from-red-900 via-zinc-800 to-black",
    posterUrl: P + "/9OkCLM73MIU2CrKZbqiT8Ln1wY2.jpg",
    backdropUrl: B + "/gILte6Zd7m1YneIr6MVhh30S9pr.jpg",
    cast: ["Ray Liotta", "Robert De Niro", "Joe Pesci", "Lorraine Bracco"],
    director: "Martin Scorsese", trailerYouTubeId: "qo5jJpHtI1Y", imdbRating: "8.7",
  },

  // ── DOCUMENTARIES ────────────────────────────────────────────────────────────
  {
    id: "my-octopus-teacher", slug: "my-octopus-teacher", title: "My Octopus Teacher",
    description: "A filmmaker forges an unusual friendship with a wild common octopus in a South African kelp forest, learning profound lessons about his own life in the process.",
    genres: ["Documentaries", "Nature"], year: 2020, duration: "1h 25m", maturity: "U",
    gradient: "from-teal-800 via-blue-900 to-slate-950",
    posterUrl: P + "/uTvivT5Cq2GNWGoGuW2XlsymCHY.jpg",
    backdropUrl: B + "/7IpHHJFcbHdB0F2gYMCJRbGP8ZP.jpg",
    cast: ["Craig Foster"],
    director: "Pippa Ehrlich, James Reed", trailerYouTubeId: "3s0LTDhqe5A", badge: "TOP 10", imdbRating: "8.1",
  },
  {
    id: "free-solo", slug: "free-solo", title: "Free Solo",
    description: "Follow Alex Honnold as he attempts to become the first person to ever free solo climb Yosemite's 3,000-foot El Capitan wall. A breathtaking document of human will.",
    genres: ["Documentaries", "Sports"], year: 2018, duration: "1h 40m", maturity: "U/A 13+",
    gradient: "from-orange-800 via-amber-900 to-stone-950",
    posterUrl: P + "/cCDznrlgQZDLFTMFVPY1XB4amHU.jpg",
    backdropUrl: B + "/rBGBhFGQBwUnZ4ZMTQ7FfHhL8AL.jpg",
    cast: ["Alex Honnold", "Tommy Caldwell", "Jimmy Chin"],
    director: "Elizabeth Chai Vasarhelyi, Jimmy Chin", trailerYouTubeId: "urRVZ4SW7WU", badge: "TRENDING", imdbRating: "8.2",
  },

  // ── FANTASY ──────────────────────────────────────────────────────────────────
  {
    id: "lord-of-the-rings-fellowship", slug: "lord-of-the-rings-fellowship", title: "The Lord of the Rings: The Fellowship of the Ring",
    description: "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.",
    genres: ["Fantasy", "Action & Adventure", "Drama"], year: 2001, duration: "3h 28m", maturity: "U/A 13+",
    gradient: "from-emerald-900 via-green-950 to-zinc-950",
    posterUrl: P + "/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg",
    backdropUrl: B + "/oiwc338EoBgS4sEI2ixAny4KQKg.jpg",
    cast: ["Elijah Wood", "Ian McKellen", "Orlando Bloom", "Viggo Mortensen"],
    director: "Peter Jackson", trailerYouTubeId: "V75dMMIW2B4", badge: "TOP 10", imdbRating: "8.9",
  },
  {
    id: "harry-potter-sorcerers-stone", slug: "harry-potter-sorcerers-stone", title: "Harry Potter and the Sorcerer's Stone",
    description: "An orphaned boy enrolls in a school of wizardry, where he learns the truth about himself, his family and the terrible evil that haunts the magical world.",
    genres: ["Fantasy", "Kids & Family", "Drama"], year: 2001, duration: "2h 32m", maturity: "U",
    gradient: "from-purple-800 via-violet-900 to-indigo-950",
    posterUrl: P + "/wuMc08IPKEatf9rnMNXvIDxqP4W.jpg",
    backdropUrl: B + "/lvOLivVeX3DVVcwfVkxKf0R22D8.jpg",
    cast: ["Daniel Radcliffe", "Emma Watson", "Rupert Grint", "Richard Harris"],
    director: "Chris Columbus", trailerYouTubeId: "VyHV0BRtdxo", badge: "TRENDING", imdbRating: "7.6",
  },

  // ── MUSIC & MUSICALS ─────────────────────────────────────────────────────────
  {
    id: "bohemian-rhapsody", slug: "bohemian-rhapsody", title: "Bohemian Rhapsody",
    description: "The story of the legendary British rock band Queen and lead singer Freddie Mercury, leading up to their famous performance at Live Aid in 1985.",
    genres: ["Music & Musicals", "Drama", "History"], year: 2018, duration: "2h 14m", maturity: "U/A 13+",
    gradient: "from-yellow-700 via-orange-800 to-zinc-950",
    posterUrl: P + "/lHu1wtNaczFPGFDTrjCSzeLPTKW.jpg",
    backdropUrl: B + "/dcvbs8z0GEXslC1kCT77x19XDeR.jpg",
    cast: ["Rami Malek", "Lucy Boynton", "Gwilym Lee", "Ben Hardy"],
    director: "Bryan Singer", trailerYouTubeId: "mP0VHJYFOAU", badge: "TOP 10", imdbRating: "7.9",
  },
  {
    id: "the-greatest-showman", slug: "the-greatest-showman", title: "The Greatest Showman",
    description: "Inspired by the imagination of P.T. Barnum, this original musical celebrates the birth of show business and tells of a visionary who rose from nothing to create a spectacle.",
    genres: ["Music & Musicals", "Drama", "Romance"], year: 2017, duration: "1h 45m", maturity: "U",
    gradient: "from-red-700 via-pink-800 to-zinc-950",
    posterUrl: P + "/b9CzMfFVzCBFWAD8FLbVrECuY6h.jpg",
    backdropUrl: B + "/xjX1zxpBzZVqVHa6z4qnHtSMzDF.jpg",
    cast: ["Hugh Jackman", "Zac Efron", "Michelle Williams", "Zendaya"],
    director: "Michael Gracey", trailerYouTubeId: "AHnENgBS9GE", badge: "NEW", imdbRating: "7.6",
  },

  // ── WESTERN ──────────────────────────────────────────────────────────────────
  {
    id: "django-unchained", slug: "django-unchained", title: "Django Unchained",
    description: "With the help of a German bounty hunter, a freed slave sets out to rescue his wife from a brutal Mississippi plantation owner. Tarantino's most entertaining, furious film.",
    genres: ["Western", "Drama", "Action & Adventure"], year: 2012, duration: "2h 45m", maturity: "A",
    gradient: "from-amber-800 via-red-900 to-stone-950",
    posterUrl: P + "/7oWY8VDWW7thTzWh3OKYRkWUlD5.jpg",
    backdropUrl: B + "/2oZklIzUbvZXXzIFzv7Hi68d6xf.jpg",
    cast: ["Jamie Foxx", "Christoph Waltz", "Leonardo DiCaprio", "Kerry Washington"],
    director: "Quentin Tarantino", trailerYouTubeId: "eUdM9vrCbow", badge: "TRENDING", imdbRating: "8.5",
  },

  // ── SPORTS ───────────────────────────────────────────────────────────────────
  {
    id: "moneyball", slug: "moneyball", title: "Moneyball",
    description: "Oakland A's general manager Billy Beane's successful attempt to assemble a baseball team on a lean budget by employing computer-generated analysis to acquire new players.",
    genres: ["Sports", "Drama", "Comedy"], year: 2011, duration: "2h 13m", maturity: "U/A 13+",
    gradient: "from-green-800 via-teal-900 to-zinc-950",
    posterUrl: P + "/4yIQq1e6iOcaZ5rLDG3lZBP3j7a.jpg",
    backdropUrl: B + "/kYlBNDkB5qFdpTDpnlQdH0CdK3T.jpg",
    cast: ["Brad Pitt", "Jonah Hill", "Philip Seymour Hoffman", "Robin Wright"],
    director: "Bennett Miller", trailerYouTubeId: "pWgyy_rlmag", badge: "TOP 10", imdbRating: "7.6",
  },

  // ── HISTORY ──────────────────────────────────────────────────────────────────
  {
    id: "schindlers-list", slug: "schindlers-list", title: "Schindler's List",
    description: "In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.",
    genres: ["History", "Drama", "War"], year: 1993, duration: "3h 15m", maturity: "A",
    gradient: "from-stone-900 via-zinc-800 to-gray-950",
    posterUrl: P + "/sF1U4EUQS8YHUYjNl3pMGNIQyr0.jpg",
    backdropUrl: B + "/loRmRzQAdCkdCRXCUH0aIsFxmhc.jpg",
    cast: ["Liam Neeson", "Ben Kingsley", "Ralph Fiennes", "Caroline Goodall"],
    director: "Steven Spielberg", trailerYouTubeId: "gG22XNhtnoY", badge: "TOP 10", imdbRating: "9.0",
  },

  // ── WAR ──────────────────────────────────────────────────────────────────────
  {
    id: "saving-private-ryan", slug: "saving-private-ryan", title: "Saving Private Ryan",
    description: "Following the Normandy Landings, a group of U.S. soldiers go behind enemy lines to retrieve a paratrooper whose brothers have been killed in action.",
    genres: ["War", "Drama", "Action & Adventure"], year: 1998, duration: "2h 49m", maturity: "A",
    gradient: "from-stone-800 via-gray-900 to-zinc-950",
    posterUrl: P + "/uqx37cS8cpHg8U35f9U5IBlrCV3.jpg",
    backdropUrl: B + "/bdD39MpSVhKjxarTxLSfX6baoMP.jpg",
    cast: ["Tom Hanks", "Matt Damon", "Tom Sizemore", "Edward Burns"],
    director: "Steven Spielberg", trailerYouTubeId: "9CiW_DgxCnQ", badge: "TRENDING", imdbRating: "8.6",
  },

  // ── KIDS & FAMILY ────────────────────────────────────────────────────────────
  {
    id: "the-lion-king", slug: "the-lion-king", title: "The Lion King",
    description: "Lion cub and future king Simba searches for his identity after he is blamed for the death of his father and flees into exile.",
    genres: ["Kids & Family", "Animation", "Drama"], year: 1994, duration: "1h 28m", maturity: "U",
    gradient: "from-orange-600 via-amber-700 to-red-900",
    posterUrl: P + "/sKCr78MXSLixwmZ8DyJLrpMsd15.jpg",
    backdropUrl: B + "/wXsQvli6tWqja51pYxXNG1LFIGV.jpg",
    cast: ["Voice: Matthew Broderick", "Voice: James Earl Jones", "Voice: Jeremy Irons"],
    director: "Roger Allers, Rob Minkoff", trailerYouTubeId: "4sj1MT05lAA", badge: "TOP 10", imdbRating: "8.5",
  },
  {
    id: "home-alone", slug: "home-alone", title: "Home Alone",
    description: "An 8-year-old troublemaker must protect his house from a pair of burglars when he is accidentally left home alone by his family during Christmas vacation.",
    genres: ["Kids & Family", "Comedy"], year: 1990, duration: "1h 43m", maturity: "U",
    gradient: "from-red-700 via-green-800 to-zinc-950",
    posterUrl: P + "/onTSipZ8R3bliBdKfPtsDuHTdlL.jpg",
    backdropUrl: B + "/ih2xVgeMS8R5WUetYE8Mr9hVTlB.jpg",
    cast: ["Macaulay Culkin", "Joe Pesci", "Daniel Stern", "Catherine O'Hara"],
    director: "Chris Columbus", trailerYouTubeId: "1Pu-DfNSoAA", imdbRating: "7.7",
  },
];

export const featuredVideo = videos.find((v) => v.id === "interstellar") ?? videos[0];

export const genres: Genre[] = [...GENRES];

export function findVideo(id: string): DemoVideo {
  return videos.find((v) => v.id === id || v.slug === id) ?? videos[0];
}

export function videosForGenre(genre: Genre | string): DemoVideo[] {
  if (genre === "Trending Now") {
    const trending = videos.filter((v) => v.badge);
    const rest = videos.filter((v) => !v.badge);
    return Array.from(
      new Map([...trending, ...rest].map((v) => [v.id, v])).values()
    ).slice(0, 14);
  }
  return videos.filter((v) => v.genres.includes(genre as Genre));
}

export function populatedGenres(): string[] {
  return genres.filter(
    (g) => g === "Trending Now" || videos.some((v) => v.genres.includes(g))
  );
}
