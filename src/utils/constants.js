
export const LOGO = "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"

export const BG_IMG = 'https://occ.a.nflxso.net/dnm/api/v6/iMyKkw5SVrkCXbCfSBEb_Pjar5Y/AAAAQBTxE26zgLJoqZnmxUCfZtVJ2HbJUsVonZ_9Uo-pn68zarPK.png'

export const USER_AVATAR = "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"

export const API_URL = "https://api.themoviedb.org/3/movie/"

export const API_KEY = process.env.TMDB_ACCESS_TOKEN

export const API_OPTIONS = {
        method: 'GET', 
        headers: {
            accept: 'application/json',
            Authorization: "Bearer " + process.env.TMDB_ACCESS_TOKEN
        }
    };



