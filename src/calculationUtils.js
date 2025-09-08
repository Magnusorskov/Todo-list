export { calculateProgressInPercentage };

const calculateProgressInPercentage = (progress) => {
    if (progress.inProgress === 0 && progress.completed === 0) {
        return 0;
    }
    return Math.floor(
        (progress.inProgress / (progress.inProgress + progress.completed)) * 100
    );
};
