import Header from "@/components/generic/Header";
import CardEvent from "@/components/specific/event/CardEvent";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col gap-20">
      <div className="flex min-h-screen flex-col items-center justify-between px-10">
        <Header />
        <Image
          src="/assets/paris-2024-logo.svg"
          alt="Paris 2024 Logo"
          width={200}
          height={200}
          priority
          color="red"
        />
        <div>
          <Link
            href="#discover"
            className="flex flex-col items-center gap-1 text-slate-500"
          >
            <p className="pb-10">Explorer</p>
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-20 p-10" id="discover">
        <h2 className="text-5xl font-bold">Les jeux olympiques 2024</h2>
        <div className="grid grid-cols-2 gap-10">
          <div className="flex flex-col gap-10">
            <p>
              Paris 2024 casse les codes en organisant pour la première fois de
              l’histoire une cérémonie d’ouverture des Jeux Olympiques d’été au
              cœur de la ville, sur la Seine. La plus grande fête du sport au
              monde, dans la plus belle ville du monde !
            </p>
            <p>
              Jamais une cérémonie d’ouverture n’aura été vécue et partagée par
              autant de personnes : au moins 600 000 spectateurs pourront y
              assister depuis les quais et les ponts de la Seine, et environ la
              moitié des accès seront gratuits.
            </p>
            <p>
              La Seine, ses ponts et les monuments de la capitale seront le
              décor d’un spectacle à couper le souffle, où les performances
              artistiques se mêleront aux performances sportives.
            </p>
          </div>
          <Image
            src="/assets/presentation.jpeg"
            alt="Paris 2024"
            width={600}
            height={600}
          />
        </div>
      </div>
      <div className="flex flex-col gap-20 p-10">
        <h2 className="text-5xl font-bold">Découvrez les épreuves</h2>
        <div className="grid grid-cols-4 gap-10">
          <CardEvent
            title="Football"
            url="https://tickets.paris2024.org/events/jeux-olympiques-225/football-2252"
            image="/assets/football.png"
          />
          <CardEvent
            title="Athlétisme"
            url="https://tickets.paris2024.org/events/jeux-olympiques-225/football-2252/?affiliate=24R"
            image="/assets/athletics.png"
          />
          <CardEvent
            title="Boxe"
            url="https://tickets.paris2024.org/events/jeux-olympiques-225/football-2252/?affiliate=24R"
            image="/assets/boxing.png"
          />
          <CardEvent
            title="Basketball"
            url="https://tickets.paris2024.org/events/jeux-olympiques-225/football-2252/?affiliate=24R"
            image="/assets/basketball.png"
          />
          <CardEvent
            title="Handball"
            url="https://tickets.paris2024.org/events/jeux-olympiques-225/football-2252/?affiliate=24R"
            image="/assets/handball.png"
          />
          <CardEvent
            title="Cérémonie d'ouverture"
            url="https://tickets.paris2024.org/events/jeux-olympiques-225/football-2252/?affiliate=24R"
            image="/assets/opening_ceremony.png"
          />
          <CardEvent
            title="Cérémonie de fermeture"
            url="https://tickets.paris2024.org/events/jeux-olympiques-225/football-2252/?affiliate=24R"
            image="/assets/closing_ceremony.png"
          />
        </div>
      </div>
    </main>
  );
}
