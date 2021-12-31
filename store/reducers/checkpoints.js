import { SHOW_CHECKPOINT_INFORMATION, HIDE_CHECKPOINT_INFORMATION } from "../actions/checkpoints";

const initialState = {
	parcoursTitle: "Alès > Rochebelle",
	checkpoints: [
		{
			id: 1,
			etape: 1,
			identifier: "Checkpoint 1",
			title: "Bourse du Travail",
			// latitude: 44.124881,
			// longitude: 4.070540,
			latitude: 44.12483578921776,
			longitude: 4.070598185062409,
			radius: 25,
			text: "text 1", // ???
			showText: false, // ???
			message: "Rendez-vous à la bourse du travail d'Alès",
			messageAudio: null,
			contents: [
				{ 
					id: "1",
					type: "text",
					title: "Bonjour et bienvenue sur cet escape parcours",
					text: "Le Bonhomme Bonheur a besoin de vous pour lui apporter du bois, de la pierre et de la main d’œuvre, pour finir la construction de son château.\n \n Aidez le à trouver ces trois éléments tout au long du chemin et vous pourrez le rencontrer.",
				},
				{ 
					id: "2",
					type: "video",
					title: "Mais d’ailleurs la Bourse du Travail… Qu’est ce que c’est ?",
					file: "https://videos.files.wordpress.com/vmovFd1y/film_mp4_hd.mp4"
				},
			]
		},
		{
			id: 2,
			etape: 2,
			identifier: "Checkpoint 2",
			title: "Le Sage",
			latitude: 44.125098,
			longitude: 4.070049,
			radius: 5,
			text: "text 2", // ???
			showText: false, // ???
			message: "« Ouvrez bien les yeux, je ne suis pas très loin. Marchez un peu, je suis en haut du chemin » ",
			messageAudio: "https://lesjeuxdesenigmes.files.wordpress.com/2021/03/sage.mp3",
			contents: [
				{ 
					id: "1",
					type: "text",
					title: "Mais quel chemin prendre ?",
					description: "<p>Dans la forêt il nous fait peur.<br>Mais aujourd’hui il vous aidera.<br>Un peu de force il vous faudra,<br>Pour gravir ce chemin là</p>",
					file: "https://lesjeuxdesenigmes.files.wordpress.com/2021/03/trepeloup.mp3"
				},
				{
					id: "2",
					type: "qcm",
					list: [
						"Rue de l'Enclos Roux",
						"Rue Paul Gaussen",
						"Chemin de Trepeloup"
					], 
					answer: "Chemin de Trepeloup"
				},
				{
					id:3,
					type: "text",
					title: "Bravo !",
					text: "Il s'agit bien du chemin de Trepeloup. Il est maintenant temps de s'y rendre"
				}
			]
		},
		{
			id: 3,
			etape: 3,
			identifier: "Checkpoint 3",
			title: "Chemin de Trepeloup",
			latitude: 44.125484,
			longitude: 4.070007,
			radius: 10,
			text: "text 3", // ???
			showText: false, // ???
			message: "« Dans la forêt il nous fait peur. \n Mais aujourd’hui il vous aidera. \n Un peu de force il vous faudra, \n Pour gravir ce chemin là. » ",
			messageAudio: "https://lesjeuxdesenigmes.files.wordpress.com/2021/03/trepeloup.mp3",
			contents: [
				{ 
					id: "1",
					type: "text",
					title: "Chemin de Trepeloup",
					text: "Il est temps de gravir ce chemin"
				},
			]
		},
		{
			id: 4,
			etape: 4,
			identifier: "Checkpoint 4",
			title: "En route vers l'hermitage",
			latitude: 44.126115,
			longitude: 4.06931,
			radius: 10,
			text: "text 3", // ???
			showText: false, // ???
			message: "« En route vers l'hermitage » ",
			messageAudio: null,
			contents: [
				{ 
					id: "2",
					type: "video",
					title: "C'est quoi l'hermitage ?",
					file: "https://videos.files.wordpress.com/VBPB9VEW/ermitage-1_hd.mp4"
				},
			]
		},
		{
			id: 5,
			etape: 5,
			identifier: "Checkpoint 5",
			title: "En route vers l'olivier",
			latitude: 44.126713,
			longitude: 4.068403,
			radius: 10,
			text: "text 3", // ???
			showText: false, // ???
			message: "En route vers l'olivier",
			messageAudio: null,
			contents: [
				{ 
					id: "1",
					type: "text",
					title: "Où est l'olivier",
					text: "« C’est quoi cet arbre ? \n On dirait un Olivier… \n Ah bah oui ! Mais c’est lequel ? »",
				},
				{ 
					id: "2",
					type: "video",
					title: "A quoi sert le grignon ?",
					file: "https://videos.files.wordpress.com/ZTDUqSqQ/2_hd.mp4"
				},
			]
		},
		//	{
		// 	etape: 1,
		// 	id: "1",
		// 	identifier: "Checkpoint 1",
		// 	latitude: 43.9058487,
		// 	longitude: 4.204211,
		// 	notifyOnEnter: true,
		// 	notifyOnExit: true,
		// 	radius: 10,
		// 	text: "Tu es entré dans le checkpoint n°1",
		// 	showText: false,
		// 	contents: [
		// 		{ 
		// 			id: "1",
		// 			type: "video",
		// 			file: "https://videos.files.wordpress.com/vmovFd1y/film_mp4_hd.mp4"
		// 		},
		// 		{ 
		// 			id: "2",
		// 			type: "audio",
		// 			file: "https://lesjeuxdesenigmes.files.wordpress.com/2021/03/sage.mp3"
		// 		},
		// 		{ 
		// 			id: "3",
		// 			type: "text",
		// 			file: "« Ouvrez bien les yeux, je ne suis pas très loin, Marchez un peu, je suis en haut du chemin »"
		// 		}
		// 	]
		// },
		// {
		// 	id: "1a",
		// 	identifier: "Zone du Checkpoint 1",
		// 	latitude: 43.9058487,
		// 	longitude: 4.204211,
		// 	notifyOnEnter: true,
		// 	notifyOnExit: false,
		// 	radius: 15,
		// 	preSignal: true,
		// 	text: "Tu es entré dans la zone du checkpoint n°1",
		// 	showText: false,
		// },
		// {
		// 	etape: 2,
		// 	id: "2",
		// 	identifier: "Checkpoint 2",
		// 	latitude: 43.905695,
		// 	longitude: 4.2037598,
		// 	notifyOnEnter: true,
		// 	notifyOnExit: true,
		// 	radius: 10,
		// 	text: "Tu es entré dans le checkpoint n°2",
		// 	showText: false,
		// },
		// {
		// 	id: "2a",
		// 	identifier: "Zone du Checkpoint 2",
		// 	latitude: 43.905695,
		// 	longitude: 4.2037598,
		// 	notifyOnEnter: true,
		// 	notifyOnExit: false,
		// 	radius: 15,
		// 	preSignal: true,
		// 	text: "Tu es entré dans la zone du checkpoint n°2",
		// 	showText: false,
		// },
	],
};

export default (state = initialState, action) => {
	switch (action.type) {
		case SHOW_CHECKPOINT_INFORMATION:
			const showCheckpointInformation = state.checkpoints.map((checkpoint) => {
				let copyCheckpoint = { ...checkpoint };
				if (checkpoint.identifier === action.checkpointIdentifier.identifier && checkpoint.preSignal !== true) {
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
				if (checkpoint.identifier === action.checkpointIdentifier.identifier && checkpoint.preSignal !== true) {
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
