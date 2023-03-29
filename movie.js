class Movie{
    constructor(xml) {
        this.id = xml.match(/<video_id>(.+)<\/video_id>/)[1];
        this.author = xml.match(/<user_nickname>(.+)<\/user_nickname>/)[1];

        const l = xml.match(/<length>(.+)<\/length>/)[1];
        const match = l.match(/(\d+):(\d+)/);
        this.length = match[1] * 60 + parseInt(match[2]);
    }
}
