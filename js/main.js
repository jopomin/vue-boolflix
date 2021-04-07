var app = new Vue ({
    el: '#root',
    data: {
        query: "",
        movies: [],
        flags: [
            'fr.png',
            'es.png',
            'pt.png',
            'en.png',
            'it.png',
            'de.png',
            'ru.png',
            'ko.png',
            'ja.png',
            'zh.png',
            'ar.png',
            'tr.png',
            'cs.png',
            'nl.png',
            'sv.png',
            'hr.png',
            'sr.png',
            'no.png',
            'da.png',
            'fi.png',
            'el.png'
        ]
    },
    
    methods: {
            printMovies() {
                const self = this;
                axios
                .get('https://api.themoviedb.org/3/search/movie', { params: {
                    api_key: '5417de2452f12562ccb44aa243d20d03',
                    query: self.query,
                    language: 'it-IT'
                    }
                })
                .then((response) => {
                    self.movies = response.data.results;
                    console.log(self.movies);
                    self.query = "";
                })
            },

            getTitleRed(i) {
                if (this.movies[i].title.length > 25) {
                    return this.movies[i].title.slice(0,25) + '...';
                } else {
                    return this.movies[i].title
                }
            },

            getOrTitleRed(i) {
                if (this.movies[i].original_title.length > 35) {
                    return this.movies[i].original_title.slice(0,35) + '...';
                } else {
                    return this.movies[i].original_title
                }
            },

            getRating(i) {
                return parseInt(this.movies[i].vote_average / 2);
            },

            getFlag(i) {
                if (this.flags.includes(this.movies[i].original_language+'.png')) {
                    const indexFlag = this.flags.indexOf(this.movies[i].original_language+'.png');
                    console.log(indexFlag);
                    return this.flags[indexFlag];
                } else {
                    return this.movies[i].original_language
                }
            },

            getPoster(i) {
                return this.movies[i].poster_path
            }
    }
})

