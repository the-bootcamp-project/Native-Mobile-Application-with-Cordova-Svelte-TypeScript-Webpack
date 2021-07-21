const DEF_DOCTYPE_INDEX = {
    fields: ["docType"],
    name: "inspector",
    ddoc: "inspector",
    type: "json",
};

const ALL_FIELDS = [
    "docType",
    "_id",
    "title",
    "url",
    "visibility",
    "createdBy",
    "createdAt",
    "checked",
    "checkedAt",
    "testet",
    "testetAt",
    "inspected",
    "inspectedAt",
    "validated",
    "validatedAt",
    "audited",
    "auditedAt",
    "changed",
    "changedAt",
    "info",
    "hasInfo",
    "warning",
    "hasWarning",
    "error",
    "hasError",
    "status",
];

export const BOOKMARK_INSPECTOR_ALL = {
    index: DEF_DOCTYPE_INDEX,
    selector: { docType: "bookmark" },
    fields: ALL_FIELDS,
};

export const BOOKMARK_INSPECTOR_SUCCESS_WIDGET = {
    index: DEF_DOCTYPE_INDEX,
    selector: {
        docType: "bookmark",
        hasInfo: { $eq: false },
        hasWarning: { $eq: false },
        hasError: { $eq: false },
    },
    fields: ALL_FIELDS,
    limit: 3,
};
export const BOOKMARK_INSPECTOR_INFO_WIDGET = {
    index: DEF_DOCTYPE_INDEX,
    selector: { docType: "bookmark", hasInfo: { $eq: true } },
    fields: ALL_FIELDS,
    limit: 3,
};
export const BOOKMARK_INSPECTOR_WARNING_WIDGET = {
    index: DEF_DOCTYPE_INDEX,
    selector: { docType: "bookmark", hasWarning: { $eq: true } },
    fields: ALL_FIELDS,
    limit: 3,
};
export const BOOKMARK_INSPECTOR_ERROR_WIDGET = {
    index: DEF_DOCTYPE_INDEX,
    selector: { docType: "bookmark", hasError: { $eq: true } },
    fields: ALL_FIELDS,
    limit: 3,
};

export const BOOKMARK_INSPECTOR_SUCCESS_TABLE = {
    index: DEF_DOCTYPE_INDEX,
    selector: { docType: "bookmark" },
    fields: ALL_FIELDS,
};
export const BOOKMARK_INSPECTOR_INFO_TABLE = {
    index: DEF_DOCTYPE_INDEX,
    selector: { docType: "bookmark", hasInfo: { $eq: true } },
    fields: ALL_FIELDS,
};
export const BOOKMARK_INSPECTOR_WARNING_TABLE = {
    index: DEF_DOCTYPE_INDEX,
    selector: { docType: "bookmark", hasWarning: { $eq: true } },
    fields: ALL_FIELDS,
};
export const BOOKMARK_INSPECTOR_ERROR_TABLE = {
    index: DEF_DOCTYPE_INDEX,
    selector: { docType: "bookmark", hasError: { $eq: true } },
    fields: ALL_FIELDS,
};

export const NEXT_TARGET = {
    index: DEF_DOCTYPE_INDEX,
    selector: { docType: "bookmark" },
    fields: ["_id", "url", "createdBy"],
    limit: 1,
};
