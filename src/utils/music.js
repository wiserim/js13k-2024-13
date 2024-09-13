/**
 * @function
 * @name play
 * 
 * Starts playing music
 */
export function play() {
	let audioCtx = new AudioContext();
	let gain = audioCtx.createGain();
	let notes = [24,24,,,,24,24,24,,,,24,24,,,,24,24,24,,,,21,20,21,,22,21,22];
	for(let i in notes) {
		let osc = audioCtx.createOscillator();
		if(notes[i]) {
			osc.connect(gain),
			gain.connect(audioCtx.destination),
			osc.start(i*.325),
			osc.frequency.setValueAtTime(220*1.06**(13-notes[i]),i*.325),
			gain.gain.setValueAtTime(1,i*.325),
			gain.gain.setTargetAtTime(.0001,i*.325+.28,.005),
			osc.stop(i*.325+.29);
		}
	}

	//loop music
	setTimeout(play, notes.length * 325);
}