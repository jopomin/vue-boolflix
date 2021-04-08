var app = new Vue ({
    el: '#root',
    data: {
        query: "",
        movies: [],
        series: [],
        media: [],
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
            printRes() {
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
                });

                axios
                .get('https://api.themoviedb.org/3/search/tv', { params: {
                    api_key: '5417de2452f12562ccb44aa243d20d03',
                    query: self.query,
                    language: 'it-IT'
                    }
                })
                .then((response) => {
                    self.series = response.data.results
                    console.log(self.series);
                    self.media = [...self.movies,...self.series];
                    self.query = "";
                    self.movies = "";
                    self.series = "";
                    console.log(self.media);
                });
               
            },

            getRating(rate) {
                return Math.ceil(rate / 2);
            },

            getFlag(lang) {
                if (this.flags.includes(lang +'.png')) {
                    const indexFlag = this.flags.indexOf(lang +'.png');
                    return this.flags[indexFlag];
                } else {
                    return lang
                }
            },

            getPoster(poster) {
                return poster
            },

            getOverRed(overview) {
                if (overview.length > 350) {
                    return overview.slice(0,350) + '...';
                } else {
                    return overview
                }
            },
    }
})

