
// GeoFencing Task
export const geofencingTask = () => {
	TaskManager.defineTask("GEOFENCING_TASK", ({ data, error }) => {
		if (error) {
			console.log(error.message);
			return;
		}

		if (data.eventType === Location.LocationGeofencingEventType.Enter) {
			exportTaskInfo = "Tu es entré dans la zone " + data.region.identifier;
			// useDispatch(checkpointsActions.showCheckpointInformation(data.region.id))
			myFunction(data.region.id);
			console.log(data.region); 
			//console.log("LOCATION : ", Location)
		} else if (data.eventType === Location.LocationGeofencingEventType.Exit) {
			exportTaskInfo = "Tu sorti de la zone " + data.region.identifier;
		}
	});
};
