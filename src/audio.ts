export default async function play(path, semitones){
	const audioCtx = new AudioContext();

	const response = await fetch(path);
	const arrayBuffer = await response.arrayBuffer();
	const soundBuffer = await audioCtx.decodeAudioData(arrayBuffer);

	const source = audioCtx.createBufferSource();
	source.buffer = soundBuffer;
	source.connect(audioCtx.destination);
	source.detune.value = semitones * 100;
	source.start();
}