import { StarIcon } from "lucide-react";
import { Button } from "../ui/button";

function StarRatingComponent({ rating = 0, handleRatingChange }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Button
          key={star}
          type="button"
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-full hover:bg-muted"
          onClick={
            handleRatingChange ? () => handleRatingChange(star) : undefined
          }
          disabled={!handleRatingChange}
        >
          <StarIcon
            className={`h-6 w-6 transition-colors ${
              star <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "fill-transparent text-gray-500"
            }`}
          />
        </Button>
      ))}
    </div>
  );
}

export default StarRatingComponent;
