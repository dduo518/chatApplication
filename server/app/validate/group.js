'use strict';

exports.createGroup = {
  body: {
    groupName: {
      type: 'string',
      require: true,
      allowEmpty: false,
    },
  },
};
exports.updateGroup = {
  body: {
    groupId: {
      type: 'string',
      require: true,
      allowEmpty: false,
    },
    groupName: {
      type: 'string',
      require: true,
      allowEmpty: false,
    },
  },
};
exports.addMembers = {
  body: {
    members: {
      type: 'array',
      require: true,
      allowEmpty: false,
    },
    groupId: {
      type: 'string',
      require: true,
      allowEmpty: false,
    },
  },
};
exports.removeMembers = exports.addMembers;

