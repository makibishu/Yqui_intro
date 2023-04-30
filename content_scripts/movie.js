class Movie{
    constructor(xml) {
        this.id = xml.match(/<video_id>(.+)<\/video_id>/)[1];
        this.title = decode(xml.match(/<title>(.+)<\/title>/)[1]);
        this.author =
            decode(xml.match(/<user_nickname>(.+)<\/user_nickname>/)[1]);

        const l = xml.match(/<length>(.+)<\/length>/)[1];
        const match = l.match(/(\d+):(\d+)/);
        this.length = match[1] * 60 + parseInt(match[2]);
    }
}

function decode(xml) {
    const patterns = {
        '&lt;'   : '<',
        '&gt;'   : '>',
        '&amp;'  : '&',
        '&quot;' : '"',
        '&apos;' : '\'',
        '&#x60;' : '`'
    };

    return xml.replace(/&(lt|gt|amp|quot|apos|#x60);/g, function(match) {
        return patterns[match];
    });
}