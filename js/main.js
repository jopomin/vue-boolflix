var app = new Vue ({
    el: '#root',
    data: {
        query: "",
        movies: [],
        series: [],
        media: [],
        ids: [],
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
        ],
        card: {
            visible: false,
            index: false,
        }
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
                });

                axios
                .get('https://api.themoviedb.org/3/search/tv', { params: {
                    api_key: '5417de2452f12562ccb44aa243d20d03',
                    query: self.query,
                    language: 'it-IT'
                    }
                })
                .then((response) => {
                    self.series = response.data.results;
                    self.media = [...self.movies,...self.series];
                    self.movies = "";
                    self.series = "";
                    self.media.sort((a,b) => (a.popularity > b.popularity) ? -1 : (a.popularity < b.popularity) ? 1 : 0);
                    console.log(self.media);
                    self.media.forEach((med) => {
                        if (!self.ids.includes(med.id)) {
                            self.ids.push(med.id)
                        }
                    });
                    console.log(self.ids);
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

            getTitleRed(title) {
                if (title.length > 50) {
                    return title.slice(0,50) + '...';
                } else {
                    return title
                }
            },

            getOverRed(overview) {
                if (overview.length > 320) {
                    return overview.slice(0,320) + '...';
                } else {
                    return overview
                }
            },

            showDetails(i) {
                if (this.card.visible !== false && this.card.index !== i) {
                    this.card.visible = false;
                    this.card.index = false;
                }
                this.card.visible = !this.card.visible;
                this.card.index = i;
            },

            hideDetails() {
                this.card.visible = false;
                this.card.index = false;
            },

    }
})

