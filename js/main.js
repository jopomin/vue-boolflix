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

/*             getTitleRed(i) {
                if ((this.media[i].title.length || this.media[i].name.length) > 25) {
                    return (this.media[i].title || this.media[i].name).slice(0,25) + '...';
                } else {
                    return (this.media[i].title || this.media[i].name)
                }
            },

            getOrTitleRed(i) {
                if ((this.media[i].original_title.length || this.media[i].original_name.length) > 35) {
                    return (this.media[i].original_title || this.media[i].original_name).slice(0,35) + '...';
                } else {
                    return (this.media[i].original_title || this.media[i].original_name)
                }
            }, */

            getRating(i) {
                return Math.ceil(this.media[i].vote_average / 2);
            },

            getFlag(i) {
                if (this.flags.includes(this.media[i].original_language+'.png')) {
                    const indexFlag = this.flags.indexOf(this.media[i].original_language+'.png');
                    return this.flags[indexFlag];
                } else {
                    return this.media[i].original_language
                }
            },

            getPoster(i) {
                return this.media[i].poster_path
            }
    }
})

