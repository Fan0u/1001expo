export const SHOW_CHECKPOINT_INFORMATION = 'SHOW_CHECKPOINT_INFORMATION';
export const HIDE_CHECKPOINT_INFORMATION = 'HIDE_CHECKPOINT_INFORMATION';

export const showCheckpointInformation = identifier => {
	return {
		type: SHOW_CHECKPOINT_INFORMATION,
		checkpointIdentifier: identifier,
	}
}

export const hideCheckpointInformation = identifier => {
	return {
		type: HIDE_CHECKPOINT_INFORMATION,
		checkpointIdentifier: identifier,
	}
}