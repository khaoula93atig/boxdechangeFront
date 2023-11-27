import { InjectableRxStompConfig } from "@stomp/ng2-stompjs";


export const myRxStompConfig: InjectableRxStompConfig = {


    brokerURL: ` ws://192.168.1.155:8083/socket`,

    connectHeaders: {
      login: 'guest',
      passcode: 'guest'
    },

    heartbeatIncoming: 0,

    heartbeatOutgoing: 20000,

    reconnectDelay: 200,

    debug: (msg: string): void => {
      console.log(new Date(), msg);
    }
  };
