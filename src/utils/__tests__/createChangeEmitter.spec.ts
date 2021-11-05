import { createChangeEmitter } from "../createChangeEmitter";
import { Emitter } from "../types";
import { NotificationProps } from "../../components/Notification/types";

let emitter: Emitter | null = null;

beforeEach(() => {
  emitter = createChangeEmitter();
});

afterEach(() => {
  emitter = null;
});

describe("Change Emitter", () => {
  it("should properly implement add/remove events", () => {
    if (!emitter) throw "no emitter";

    const { listen, emit } = emitter;
    let result = 1;

    listen((action) => {
      switch (action) {
        case "add":
          result += 1;
          break;
        case "remove":
          result -= 1;
          break;
        default:
          break;
      }
    });
    emit("add");
    emit("add");
    emit("remove");

    expect(result).toEqual(2);
  });
  it("should use additional param passed in emit method", () => {
    if (!emitter) throw "no emitter";

    const { listen, emit } = emitter;
    const notification: NotificationProps = {
      type: "success",
      width: "450px",
      content: "Success Notification New",
    };

    let result;

    listen((action, param) => {
      switch (action) {
        case "add":
          result = param;
          break;
        default:
          break;
      }
    });
    emit("add", notification);

    expect(result).toEqual(notification);
  });
});
