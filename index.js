import { RaspiIO as Raspi } from "raspi-io";
import Jonny from "johnny-five";

const { Board, Led } = Jonny;

const board = new Board({
  io: new Raspi(),
  repl: false,
});

board.on("ready", async function () {
  const led1 = new Led.RGB({
    pins: {
      red: "P1-13",
      green: "P1-11",
      blue: "P1-7",
    },
    isAnode: false,
  });

  const led2 = new Led.RGB({
    pins: {
      red: "P1-18",
      green: "P1-16",
      blue: "P1-15",
    },
    isAnode: true,
  });
  let index = 0;
  let index2 = 4;
  const rainbow = ["ff0000", "ff5a00", "ff9a00", "ffce00", "ffe808"];
  let delay = 50;
  led1.strobe(250);
  led2.strobe(250);
  board.loop(delay, () => {
    led1.color(rainbow[index++]);
    if (index === rainbow.length) {
      index = 0;
    }
    led2.color(rainbow[index2--]);
    if (index === 0) {
      index2 = rainbow.length - 1;
    }
  });
});
