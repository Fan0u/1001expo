import { SHOW_CHECKPOINT_INFORMATION, HIDE_CHECKPOINT_INFORMATION } from "../actions/checkpoints";

const initialState = {
	checkpoints: [
		{
			etape: 1,
			id: "1",
			identifier: "Checkpoint 1",
			latitude: 43.9058487,
			longitude: 4.204211,
			notifyOnEnter: true,
			notifyOnExit: true,
			radius: 10,
			text: "Tu es entré dans le checkpoint n°1",
			showText: false,
			contents: [
				{ 
					id: "1",
					type: "video",
					file: "https://videos.files.wordpress.com/vmovFd1y/film_mp4_hd.mp4"
				},
				{ 
					id: "2",
					type: "audio",
					file: "https://lesjeuxdesenigmes.files.wordpress.com/2021/03/sage.mp3"
				},
				{ 
					id: "3",
					type: "text",
					file: "« Ouvrez bien les yeux, je ne suis pas très loin, Marchez un peu, je suis en haut du chemin »"
				}
			]
		},
		{
			id: "1a",
			identifier: "Zone du Checkpoint 1",
			latitude: 43.9058487,
			longitude: 4.204211,
			notifyOnEnter: true,
			notifyOnExit: false,
			radius: 15,
			preSignal: true,
			text: "Tu es entré dans la zone du checkpoint n°1",
			showText: false,
		},
		{
			etape: 2,
			id: "2",
			identifier: "Checkpoint 2",
			latitude: 43.905695,
			longitude: 4.2037598,
			notifyOnEnter: true,
			notifyOnExit: true,
			radius: 10,
			text: "Tu es entré dans le checkpoint n°2",
			showText: false,
		},
		{
			id: "2a",
			identifier: "Zone du Checkpoint 2",
			latitude: 43.905695,
			longitude: 4.2037598,
			notifyOnEnter: true,
			notifyOnExit: false,
			radius: 15,
			preSignal: true,
			text: "Tu es entré dans la zone du checkpoint n°2",
			showText: false,
		},
	],
};

export default (state = initialState, action) => {
	switch (action.type) {
		case SHOW_CHECKPOINT_INFORMATION:
			const showCheckpointInformation = state.checkpoints.map((checkpoint) => {
				let copyCheckpoint = { ...checkpoint };
				if (checkpoint.identifier === action.checkpointIdentifier.identifier) {
					copyCheckpoint.showText = true;
				}
				return copyCheckpoint;
			});
			return {
				...state,
				checkpoints: showCheckpointInformation,
			};
		case HIDE_CHECKPOINT_INFORMATION:
			const hideCheckpointInformation = state.checkpoints.map((checkpoint) => {
				let copyCheckpoint = { ...checkpoint };
				if (checkpoint.identifier === action.checkpointIdentifier.identifier) {
					copyCheckpoint.showText = false;
				}
				return copyCheckpoint;
			});
			return {
				...state,
				checkpoints: hideCheckpointInformation,
			};
		default:
			return state;
	}
};
