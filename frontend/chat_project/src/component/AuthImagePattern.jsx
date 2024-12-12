const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-base-200 p-12">
      <div className="max-w-md text-center relative">
        {/* Circle Pattern */}
        <div className="relative mb-8 flex justify-center items-center">
          <div className="relative w-40 h-40">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className={`absolute w-8 h-8 rounded-full bg-primary/20 ${
                  i % 2 === 0 ? "animate-bounce" : "animate-pulse"
                }`}
                style={{
                  top: `${50 + 40 * Math.sin((i * Math.PI) / 3)}%`,
                  left: `${50 + 40 * Math.cos((i * Math.PI) / 3)}%`,
                  transform: "translate(-50%, -50%)",
                }}
              />
            ))}
          </div>
        </div>

        {/* Title and Subtitle */}
        <h2 className="text-3xl font-bold mb-4">{title}</h2>
        <p className="text-base-content/60">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;
