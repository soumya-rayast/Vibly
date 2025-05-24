const NoFriendsFound = () => {
  return (
    <div className="card bg-base-100 border shadow-sm text-center py-10 px-6 rounded-xl">
      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-primary">No friends yet</h3>
        <p className="text-sm text-muted-foreground">
          Start connecting with language partners below to begin your journey!
        </p>
        <div className="mt-4">
          <span className="inline-block px-4 py-2 text-sm font-medium bg-primary text-white rounded-full">
            Find Learners Now
          </span>
        </div>
      </div>
    </div>
  );
};

export default NoFriendsFound;
