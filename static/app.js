class Boggle{
    constructor(boardId, sec=60){
        this.words = new Set()
        this.sec = sec
        this.score = 0
        this.board = $('#' + boardId)

        $('#guess-form', this.board).on('submit', this.handleSubmit.bind(this))
    }
    async handleSubmit(e){
        e.preventDefault()
        const $word = $('.word', this.board)
        let word = $word.val()
        
        const res = await axios.get('/check-word', {params:{word: word}})
        console.log(res.data.result)
        if(res.data.result === 'not-word'){
            $('.show-message').text('This is not a word')
        }else if(res.data.result === 'not-on-board'){
            $('.show-message').text('This is not a valid word on board')
        }else{
            $('.show-word').append(`<li>${word}</li>`)
            this.score += 1
            $('.show-score').text(this.score)
        }
        $word.val("")
    }
}

let game = new Boggle('boggle', 60)

