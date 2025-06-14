import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function Home() {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>This is a description of the card.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This is the content of the card.</p>
        </CardContent>
        <CardFooter>
          <button className="btn">Action</button>
        </CardFooter>
      </Card>
    </div>
  );
}
