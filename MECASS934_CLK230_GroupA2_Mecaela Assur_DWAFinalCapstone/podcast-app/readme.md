# Podcast App

## Overview
The Podcast App allows users to browse various podcast shows, play episodes, and track their favorite episodes. The app is built using [Framework/Library Name] (e.g., React, Vue.js) and fetches data from a public API. The data consists of three main entities: `EPISODE`, `SEASON`, and `SHOW`. Users can also see a preview of shows with limited information (`PREVIEW`).

## Features
- **Browse Shows:** Users can view a list of all available podcast shows.
- **Play Episodes:** Users can play specific episodes of any show.
- **Track Favorites:** Users can mark episodes as favorites and view them later.
- **Seasonal View:** Users can view episodes by season and toggle between different seasons.
- **Sorting and Filtering:** Users can sort shows by title or date and filter them by genre or title.

## Data Structure
The data used in the app is divided into the following semantic units:
1. **EPISODE:** Represents a specific MP3 file that a user can listen to.
2. **SEASON:** A collection of episodes released across a specific timespan.
3. **SHOW:** A specific podcast that contains one or more seasons.
4. **PREVIEW:** A summarized version of a show with basic data but no season or episode information.

### Genre Mapping
The following genre IDs are mapped to their respective titles:
1. Personal Growth
2. True Crime and Investigative Journalism
3. History
4. Comedy
5. Entertainment
6. Business
7. Fiction
8. News
9. Kids and Family

## API Endpoints
Data can be fetched from the following endpoints:
1. `GET /shows` - Fetch all shows.
2. `GET /shows/<ID>` - Fetch details of a specific show by ID.

## Project Structure
- **`src/components`**: Contains all the reusable components such as `AllShowList.js`, `EpisodeList.js`, `FavoritesList.js`, etc.
- **`src/pages`**: Contains the main pages like `Home.js`, `Show.js`, and `Season.js`.
- **`src/services`**: Contains the `api.js` file responsible for making API calls.
- **`src/assets`**: Stores static assets such as images.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/podcast-app.git