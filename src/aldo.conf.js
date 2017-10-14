'use strict';

/*
 * Configuration options for Aldo.
 */

this.conf = {};

conf.fb = {};
conf.fb.appID = '319585755122078';
conf.fb.version = 'v2.9';
conf.fb.sdkUrl = '//connect.facebook.net/de_DE/sdk/debug.js';
conf.fb.apiUrl = 'https://graph.facebook.com/' + conf.fb.version;
conf.fb.videoUploadUrl = 'https://graph-video.facebook.com/' + conf.fb.version;
conf.fb.fileSizeLimit = 10 * 2 ** 20;
conf.fb.videoSizeLimit = 10 * 2 ** 30;
conf.fb.videoFormats = [
    '3g2',
    '3gp',
    '3gpp',
    'asf',
    'avi',
    'dat',
    'divx',
    'dv',
    'f4v',
    'flv',
    'gif',
    'm2ts',
    'm4v',
    'mkv',
    'mod',
    'mov',
    'mp4',
    'mpe',
    'mpeg',
    'mpeg4',
    'mpg',
    'mts',
    'nsv',
    'ogm',
    'ogv',
    'qt',
    'tod',
    'ts',
    'vob',
    'wmv'
];

conf.perms = {};
conf.perms.manage_pages = {
    required: true,
    desc: "Zugriff auf deine Seiten erlauben",
};
conf.perms.publish_pages = {
    required: true,
    desc: "Im Namen deiner Seiten posten",
    msg: "Für deine Seiten posten, liken und kommentieren."
};
conf.perms.pages_show_list = {
    required: true,
    desc: "Eine Liste mit deinen Seiten anzeigen",
    mgs: "Deine Seiten anzeigen, damit du eine auswählen kannst."
};

conf.app = {};
conf.app.baseDelay = 2000;

