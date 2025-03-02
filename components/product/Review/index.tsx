import {Card, CardContent} from "@/components/ui/card";

import { Review } from "@prisma/client";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import Stars from "@/components/product/Stars";
// Update our Review component to use the review data from the database
export default function ReviewView({ review }: { review: Review }) {
    // grab the initials from the name
    const initials = review.name
        .split(" ")
        .map((n) => n[0])
        .join("");

    return (
        <Card>
            <CardContent className="grid gap-4 p-4">
                <div className="flex items-center gap-4">
                    <Avatar>
                        <AvatarImage alt="@jaredpalmer" src="/placeholder-avatar.jpg" />
                        <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                    <div>
                        <h3 className="font-semibold">{review.name}</h3>
                        <div className="flex items-center gap-0.5">
                            <Stars rating={review.rating} />
                        </div>
                    </div>
                </div>
                <p>{review.content}</p>
            </CardContent>
        </Card>
    );
}
