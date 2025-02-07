export const workflow = {
  workflowName: "leaveApplication",
  id:"",
  states: [
    {
      id: "1738838146540",
      type: "circle",
      x: 57,
      y: 235,
      width: 150,
      height: 79,
      stateId: "LEAVE_REQUEST",
      prasentStatues:"",
      initialState: true,
      endState: true,
    },
    {
      id: "1738838163185",
      type: "square",
      x: 264,
      y: 236,
      width: 159,
      height: 77,
      stateId: "LEAVE_REQUEST_SUBMITTED",
      initialState: true,
      prasentStatues:"",
      endState: true,
    },
    {
      id: "1738838185170",
      type: "diamond",
      x: 516,
      y: 227,
      width: 100,
      height: 100,
      stateId: "FIRST_LEVEL_APPROVAL",
      initialState: false,
      prasentStatues:"",
      endState: false,
    },
    {
      id: "1738838197887",
      type: "diamond",
      x: 729,
      y: 228,
      width: 100,
      height: 100,
      stateId: "SECOND_LEVEL_APPROVAL",
      initialState: false,
      prasentStatues:"",
      endState: false,
    },
    {
      id: "1738838217128",
      type: "arrow",
      x: 207,
      y: 275,
      width: 100,
      height: 0,
      startPoint: {
        x: 207,
        y: 275,
      },
      endPoint: {
        x: 259,
        y: 276,
      },
      stateId: "LEAVE_REQUEST_PROGRESS",
      initialState: true,
      prasentStatues:"",
      endState: true,
    },
    {
      id: "1738838241645",
      type: "arrow",
      x: 420,
      y: 277,
      width: 100,
      height: 0,
      startPoint: {
        x: 420,
        y: 277,
      },
      endPoint: {
        x: 490,
        y: 276,
      },
      stateId: "FIRST_LEVEL_PROGRESS",
      initialState: false,
      prasentStatues:"",
      endState: false,
    },
    {
      id: "1738838297596",
      type: "arrow",
      x: 638,
      y: 276,
      width: 100,
      height: 0,
      startPoint: {
        x: 638,
        y: 276,
      },
      endPoint: {
        x: 704,
        y: 278,
      },
      stateId: "FIRST_LEVEL_PROGRESS",
      initialState: false,
      prasentStatues:"",
      endState: false,
    },
    {
      id: "1738838340714",
      type: "arrow",
      x: 850,
      y: 278,
      width: 100,
      height: 0,
      startPoint: {
        x: 850,
        y: 278,
      },
      endPoint: {
        x: 920,
        y: 278,
      },
      stateId: "FIRST_LEVEL_PROGRESS",
      initialState: false,
      prasentStatues:"",
      endState: false,
    },
    {
      id: "1738838401343",
      type: "square",
      x: 924,
      y: 241,
      width: 163,
      height: 74,
      stateId: "FIRST_LEVEL_PROGRESS",
      initialState: false,
      prasentStatues:"",
      endState: false,
    },
    {
      id: "1738838440371",
      type: "square",
      x: 698,
      y: 382,
      width: 169,
      height: 72,
      stateId: "FIRST_LEVEL_PROGRESS",
      initialState: false,
      prasentStatues:"",
      endState: false,
    },
    {
      id: "1738838466479",
      type: "square",
      x: 484,
      y: 385,
      width: 166,
      height: 71,
      stateId: "FIRST_LEVEL_PROGRESS",
      initialState: false,
      prasentStatues:"",
      endState: false,
    },
    {
      id: "1738838521451",
      type: "arrow",
      x: 565,
      y: 366,
      width: 100,
      height: 0,
      startPoint: {
        x: 566,
        y: 347,
      },
      endPoint: {
        x: 567,
        y: 381,
      },
      stateId: "FIRST_LEVEL_PROGRESS",
      initialState: false,
      prasentStatues:"",
      endState: false,
    },
    {
      id: "1738838578660",
      type: "arrow",
      x: 778,
      y: 366,
      width: 100,
      height: 0,
      startPoint: {
        x: 778,
        y: 349,
      },
      endPoint: {
        x: 778,
        y: 377,
      },
      stateId: "FIRST_LEVEL_PROGRESS",
      initialState: false,
      prasentStatues:"",
      endState: false,
    },
  ],
  transitions: [
    {
      sourceState: "LEAVE_REQUEST_SUBMITTED",
      targetState: "FIRST_LEVEL_APPROVAL",
      event: "SUBMIT_REQUEST",
      actionBean: "sendFirstLevelApprovalEmailAction",
      guardBean: "validateLeaveRequestGuard",
    },
    {
      sourceState: "FIRST_LEVEL_APPROVAL",
      targetState: "SECOND_LEVEL_APPROVAL",
      event: "APPROVE_FIRST_LEVEL",
      actionBean: "sendSecondLevelApprovalEmailAction",
      guardBean: "",
    },
    {
      sourceState: "FIRST_LEVEL_APPROVAL",
      targetState: "LEAVE_REJECTED",
      event: "REJECT_FIRST_LEVEL",
      actionBean: "logRejectionAction",
      guardBean: "validateRejectionReasonGuard",
    },
    {
      sourceState: "SECOND_LEVEL_APPROVAL",
      targetState: "LEAVE_APPROVED",
      event: "APPROVE_SECOND_LEVEL",
      actionBean: "logApprovalAction",
      guardBean: "",
    },
    {
      sourceState: "SECOND_LEVEL_APPROVAL",
      targetState: "LEAVE_REJECTED",
      event: "REJECT_SECOND_LEVEL",
      actionBean: "logRejectionAction",
      guardBean: "",
    },
  ],
};


