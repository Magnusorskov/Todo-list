export { calculateProgressInPercentage };

const calculateProgressInPercentage = (progress) => {
    const totalItems = progress.completed + progress.inProgress;

    if (totalItems === 0) {
        return 0;
    }

    return Math.round((progress.completed / totalItems) * 100);
};
