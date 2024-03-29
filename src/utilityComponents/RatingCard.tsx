import { StarIcon } from "@heroicons/react/20/solid";

const reviews = {
  average: 4,
  totalCount: 52,
  counts: [
    { rating: 5, count: 40 },
    { rating: 4, count: 4 },
    { rating: 3, count: 3 },
    { rating: 2, count: 4 },
    { rating: 1, count: 1 },
  ],
  featured: [
    {
      id: 1,
      rating: 5,
      content: `
        <p>This is the bag of my dreams. I took it on my last vacation and was able to fit an absurd amount of snacks for the many long and hungry flights.</p>
      `,
      author: "Emily Selman",
      avatarSrc:
        "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
    },
    {
      id: 2,
      rating: 5,
      content: `
        <p>This is the bag of my dreams. I took it on my last vacation and was able to fit an absurd amount of snacks for the many long and hungry flights.</p>
      `,
      author: "Emily Selman",
      avatarSrc:
        "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
    },
    {
      id: 3,
      rating: 5,
      content: `
        <p>This is the bag of my dreams. I took it on my last vacation and was able to fit an absurd amount of snacks for the many long and hungry flights.</p>
      `,
      author: "Emily Selman",
      avatarSrc:
        "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
    },
    // More reviews...
  ],
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function RatingCard() {
  return (
    <div className="mx-auto">
      <div className="">
        <div className="mt-3 flex items-center">
          <div>
            <div className="flex items-center">
              {[0, 1, 2, 3, 4].map((rating) => (
                <StarIcon
                  key={rating}
                  className={classNames(
                    reviews.average > rating
                      ? "text-yellow-400"
                      : "text-gray-300",
                    "flex-shrink-0 h-5 w-5"
                  )}
                  aria-hidden="true"
                />
              ))}
            </div>
            <p className="sr-only">{reviews.average}от 5 звезди</p>
          </div>
          <p className="ml-2 text-sm text-gray-900">
            Базирано на {reviews.totalCount} ревюта
          </p>
        </div>

        <div className="mt-6">
          <h3 className="sr-only">Review data</h3>

          <dl className="space-y-3">
            {reviews.counts.map((count) => (
              <div key={count.rating} className="flex items-center text-sm">
                <dt className="flex flex-1 items-center">
                  <p className="w-3 font-medium text-gray-900">
                    {count.rating}
                    <span className="sr-only"> star reviews</span>
                  </p>
                  <div
                    aria-hidden="true"
                    className="ml-1 flex flex-1 items-center"
                  >
                    <StarIcon
                      className={classNames(
                        count.count > 0 ? "text-yellow-400" : "text-gray-300",
                        "flex-shrink-0 h-5 w-5"
                      )}
                      aria-hidden="true"
                    />

                    <div className="relative ml-3 flex-1">
                      <div className="h-3 rounded-full border border-gray-200 bg-gray-100" />
                      {count.count > 0 ? (
                        <div
                          className="absolute inset-y-0 rounded-full border border-yellow-400 bg-yellow-400"
                          style={{
                            width: `calc(${count.count} / ${reviews.totalCount} * 100%)`,
                          }}
                        />
                      ) : null}
                    </div>
                  </div>
                </dt>
                <dd className="ml-3 w-10 text-right text-sm tabular-nums text-gray-900">
                  {Math.round((count.count / reviews.totalCount) * 100)}%
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="mt-16">
        <h3 className="sr-only">Recent reviews</h3>

        <div className="flow-root">
          <div className="-my-12 divide-y divide-gray-200">
            {reviews.featured.map((review) => (
              <div key={review.id} className="py-12">
                <div className="flex items-center">
                  <img
                    src={review.avatarSrc}
                    alt={`${review.author}.`}
                    className="h-12 w-12 rounded-full"
                  />
                  <div className="ml-4">
                    <h4 className="text-sm font-bold text-gray-900">
                      {review.author}
                    </h4>
                    <div className="mt-1 flex items-center">
                      {[0, 1, 2, 3, 4].map((rating) => (
                        <StarIcon
                          key={rating}
                          className={classNames(
                            review.rating > rating
                              ? "text-yellow-400"
                              : "text-gray-300",
                            "h-5 w-5 flex-shrink-0"
                          )}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <p className="sr-only">{review.rating} out of 5 stars</p>
                  </div>
                </div>

                <div
                  className="mt-4 space-y-6 text-base italic text-gray-600"
                  dangerouslySetInnerHTML={{ __html: review.content }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
