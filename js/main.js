var app = new Vue ({
    el: '#root',
    data: {
        query: "",
        movies: [],
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
            }
    }
})

