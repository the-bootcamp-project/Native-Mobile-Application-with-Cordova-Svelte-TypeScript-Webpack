// const TARGET_VALUE = ['content', 'href']
const TARGET_META_SELECT = ["name", "property", "itemprop"];
const TARGET_LINK_SELECT = ["rel"];

const getTagSelector = (htmltag: string, value: string): string => {
    const result: string[] = [];

    if (htmltag.toLowerCase() === "meta") {
        for (const selector of TARGET_META_SELECT) {
            result.push(`${htmltag}[${selector}="${value}"]`);
        }
    } else if (htmltag.toLowerCase() === "link") {
        for (const selector of TARGET_LINK_SELECT) {
            result.push(`${htmltag}[${selector}="${value}"]`);
        }
    }

    return result.join();
};

export const METATAGS_PATTERN = {
    commun: {
        title: { selector: "title", attr: "" }, // <title>#titletext#</title>
        charset: { selector: "meta[charset]", attr: "charset" }, // <meta charset="utf-8" />
        viewport: { selector: getTagSelector("meta", "viewport"), attr: "content" }, // <meta name="viewport" content="#contenttext#" />
    },
    url: {
        url: { selector: getTagSelector("meta", "url"), attr: "content" }, // <meta name="url" content="#contenttext#" />
        openGraphURL: {
            selector: getTagSelector("meta", "og:url"),
            attr: "content",
        }, // <meta name="og:url" content="#contenttext#" />
        host: { selector: getTagSelector("meta", "host"), attr: "content" }, // <meta name="host" content="#contenttext#" />
        index: { selector: getTagSelector("link", "index"), attr: "href" }, // <link rel="index" href="#hreflink#" title="#hreftitle#" type="#mimetype#" />
        self: { selector: getTagSelector("link", "self"), attr: "href" }, // <link rel="self" href="#hreflink#" title="#hreftitle#" type="#mimetype#" />
    },
    referURL: {
        syndicationSource: {
            selector: getTagSelector("meta", "syndication-source"),
            attr: "content",
        }, // <meta name="syndication-source" content="#contenttext#" />
        originalSource: {
            selector: getTagSelector("meta", "original-source"),
            attr: "content",
        }, //<meta name="original-source" content="#contenttext#" />
        identifierURL: {
            selector: getTagSelector("meta", "identifier-url"),
            attr: "content",
        }, // <meta name="identifier-url" content="#contenttext#" />
        linkage: { selector: getTagSelector("meta", "linkage"), attr: "content" }, // <meta name="linkage" content="#contenttext#" />
        shortlink: { selector: getTagSelector("link", "shortlink"), attr: "href" }, // <link rel="shortlink" href="#hreflink#" title="#hreftitle#" type="#mimetype#" />
        canonical: { selector: getTagSelector("link", "canonical"), attr: "href" }, //<link rel="canonical" href="#hreflink#" title="#hreftitle#" type="#mimetype#" />
        archives: { selector: getTagSelector("link", "archives"), attr: "href" }, // <link rel="archives" href="#hreflink#" title="#hreftitle#" type="#mimetype#" />
        pingback: { selector: getTagSelector("link", "pingback"), attr: "href" }, // <link rel="pingback" href="#hreflink#" title="#hreftitle#" type="#mimetype#" />
        search: { selector: getTagSelector("link", "search"), attr: "href" }, //<link rel="search" href="#hreflink#" title="#hreftitle#" type="#mimetype#" />
        start: { selector: getTagSelector("link", "start"), attr: "href" }, // <link rel="start" href="#hreflink#" title="#hreftitle#" type="#mimetype#" />
        first: { selector: getTagSelector("link", "first"), attr: "href" }, // <link rel="first" href="#hreflink#" title="#hreftitle#" type="#mimetype#" />
        last: { selector: getTagSelector("link", "last"), attr: "href" }, // <link rel="last" href="#hreflink#" title="#hreftitle#" type="#mimetype#" />
        next: { selector: getTagSelector("link", "next"), attr: "href" }, // <link rel="next" href="#hreflink#" title="#hreftitle#" type="#mimetype#" />
        prev: { selector: getTagSelector("link", "prev"), attr: "href" }, // <link rel="prev" href="#hreflink#" title="#hreftitle#" type="#mimetype#" />
        previous: { selector: getTagSelector("link", "previous"), attr: "href" }, // <link rel="previous" href="#hreflink#" title="#hreftitle#" type="#mimetype#" />
    },
    title: {
        title: { selector: getTagSelector("meta", "title"), attr: "content" }, // <meta name="title" content="#contenttext#" />
        openGraphTitle: {
            selector: getTagSelector("meta", "og:title"),
            attr: "content",
        }, // <meta name="og:title" content="#contenttext#" />
        dublinCore: {
            selector: getTagSelector("meta", "dc.title"),
            attr: "content",
        }, // <meta name="dc.title" content="#contenttext#" />
        subtitle: { selector: getTagSelector("meta", "subtitle"), attr: "content" }, // <meta name="subtitle" content="#contenttext#" />
    },
    name: {
        name: { selector: getTagSelector("meta", "name"), attr: "content" }, // <meta name="name" content="#contenttext#" />
        openGraphSiteName: {
            selector: getTagSelector("meta", "og:site_name"),
            attr: "content",
        }, // <meta name="og:site_name" content="#contenttext#" />
        pagename: { selector: getTagSelector("meta", "pagename"), attr: "content" }, // <meta name="pagename" content="#contenttext#" />
        applicationName: {
            selector: getTagSelector("meta", "application-name"),
            attr: "content",
        }, // <meta name="application-name" content="#contenttext#" />
    },
    description: {
        description: {
            selector: getTagSelector("meta", "description"),
            attr: "content",
        }, // <meta name="description" itemprop="description" content="#contenttext#" />
        openGraphDescription: {
            selector: getTagSelector("meta", "og:description"),
            attr: "content",
        }, // <meta name="og:description" property="og:description" content="#contenttext#" />
        dublinCore: {
            selector: getTagSelector("meta", "dc.description"),
            attr: "content",
        }, // <meta name="dc.description" content="#contenttext#" />
    },
    subject: {
        summary: { selector: getTagSelector("meta", "summary"), attr: "content" }, // <meta name="summary" content="#contenttext#" />
        abstract: { selector: getTagSelector("meta", "abstract"), attr: "content" }, // <meta name="abstract" content="#contenttext#" />
        subject: { selector: getTagSelector("meta", "subject"), attr: "content" }, // <meta name="subject" content="#contenttext#" />
        dublinCoreSubject: {
            selector: getTagSelector("meta", "dc.subject"),
            attr: "content",
        }, // <meta name="dc.subject" content="#contenttext#" />
    },
    topic: {
        keywords: { selector: getTagSelector("meta", "keywords"), attr: "content" }, // <meta name="keywords" content="#contenttext#" />
        topic: { selector: getTagSelector("meta", "topic"), attr: "content" }, // <meta name="topic" content="#contenttext#" />
        pageTopic: {
            selector: getTagSelector("meta", "page-topic"),
            attr: "content",
        }, // <meta name="page-topic" content="#contenttext#" />
        note: { selector: getTagSelector("meta", "note"), attr: "content" }, // <meta name="note" content="#contenttext#" />
    },
    type: {
        pageType: {
            selector: getTagSelector("meta", "page-type"),
            attr: "content",
        }, // <meta name="page-type" content="#contenttext#" />
        openGraphType: {
            selector: getTagSelector("meta", "og:type"),
            attr: "content",
        }, // <meta name="og:type" content="#contenttext#" />
        medium: { selector: getTagSelector("meta", "medium"), attr: "content" }, // <meta name="medium" content="#contenttext#" />
    },
    person: {
        author: { selector: getTagSelector("meta", "author"), attr: "content" }, // <meta name="author" content="#contenttext#" />
        owner: { selector: getTagSelector("meta", "copyright"), attr: "content" }, // <meta name="copyright" content="#contenttext#" />
        copyright: { selector: getTagSelector("meta", "owner"), attr: "content" }, // <meta name="owner" content="#contenttext#" />
        dublinCoreRights: {
            selector: getTagSelector("meta", "dc.rights"),
            attr: "content",
        }, // <meta name="dc.rights" content="#contenttext#" />
        publisher: {
            selector: getTagSelector("meta", "publisher"),
            attr: "content",
        }, // <meta name="publisher" content="#contenttext#" />
        dublinCorePublisher: {
            selector: getTagSelector("meta", "dc.publisher"),
            attr: "content",
        }, // <meta name="dc.publisher" content="#contenttext#" />
        profileFirstName: {
            selector: getTagSelector("meta", "profile:first_name"),
            attr: "content",
        }, // <meta property="profile:first_name" content="#contenttext#" />
        profileLastName: {
            selector: getTagSelector("meta", "profile:last_name"),
            attr: "content",
        }, // <meta property="profile:last_name" content="#contenttext#" />
        dublinCoreCreator: {
            selector: getTagSelector("meta", "dc.creator"),
            attr: "content",
        }, // <meta name="dc.creator" content="#contenttext#" />
        designer: { selector: getTagSelector("meta", "designer"), attr: "content" }, // <meta name="designer" content="#contenttext#" />
        made: { selector: getTagSelector("meta", "made"), attr: "content" }, // <meta name="made" content="#contenttext#" />
        contactName: {
            selector: getTagSelector("meta", "contactName"),
            attr: "content",
        }, // <meta name="contactName" content="#contenttext#" />
        operator: { selector: getTagSelector("meta", "operator"), attr: "content" }, // <meta name="operator" content="#contenttext#" />
        hostAdmin: {
            selector: getTagSelector("meta", "host-admin"),
            attr: "content",
        }, // <meta name="host-admin" content="#contenttext#" />
        authorHref: { selector: getTagSelector("link", "author"), attr: "href" }, // <link rel="author" href="#hreflink#" />
        publisherHref: {
            selector: getTagSelector("link", "publisher"),
            attr: "href",
        }, // <link rel="publisher" href="#hreflink#" />
        me: { selector: getTagSelector("link", "me"), attr: "href" }, // <link rel="me" href="#hreflink#" type="#mimetype#" />
    },
    site: {
        directory: {
            selector: getTagSelector("meta", "directory"),
            attr: "content",
        }, // <meta name="directory" content="#contenttext#" />
        audience: { selector: getTagSelector("meta", "audience"), attr: "content" }, // <meta name="audience" content="#contenttext#" />
        category: { selector: getTagSelector("meta", "category"), attr: "content" }, // <meta name="category" content="#contenttext#" />
        classification: {
            selector: getTagSelector("meta", "classification"),
            attr: "content",
        }, // <meta name="classification" content="#contenttext#" />
        referrer: { selector: getTagSelector("meta", "referrer"), attr: "content" }, // <meta name="referrer" content="#contenttext#" />
        target: { selector: getTagSelector("meta", "target"), attr: "content" }, // <meta name="target" content="#contenttext#" />
        coverage: { selector: getTagSelector("meta", "coverage"), attr: "content" }, // <meta name="coverage" content="#contenttext#" />
        distribution: {
            selector: getTagSelector("meta", "distribution"),
            attr: "content",
        }, // <meta name="distribution" content="#contenttext#" />
        rating: { selector: getTagSelector("meta", "rating"), attr: "content" }, // <meta name="rating" content="#contenttext#" />
        license: { selector: getTagSelector("link", "license"), attr: "content" }, // <link rel="license" href="#hreflink#" />
        manifest: { selector: getTagSelector("link", "manifest"), attr: "content" }, // <link rel="manifest" href="#hreflink#" />
    },
    csrf: {
        param: { selector: getTagSelector("meta", "csrf-param"), attr: "content" }, // <meta name="csrf-param" content="#contenttext#" />
        token: { selector: getTagSelector("meta", "csrf-token"), attr: "content" }, // <meta name="csrf-token" content="#contenttext#" />
    },
    generator: {
        generator: {
            selector: getTagSelector("meta", "generator"),
            attr: "content",
        }, // <meta name="generator" content="#contenttext#" />
        version: { selector: getTagSelector("meta", "version"), attr: "content" }, // <meta name="version" content="#contenttext#" />
        id: { selector: getTagSelector("meta", "id"), attr: "content" }, // <meta name="id" content="#contenttext#" />
        template: { selector: getTagSelector("meta", "template"), attr: "content" }, // <meta name="template" content="#contenttext#" />
    },
    dates: {
        date: { selector: getTagSelector("meta", "date"), attr: "content" }, // <meta name="date"content="#contenttext#" />
        presdate: { selector: getTagSelector("meta", "presdate"), attr: "content" }, // <meta name="presdate" content="#contenttext#" />
        searchDate: {
            selector: getTagSelector("meta", "search_date"),
            attr: "content",
        }, // <meta name="search_date"content="#contenttext#" />
        creationDate: {
            selector: getTagSelector("meta", "creation_date"),
            attr: "content",
        }, // <meta name="creation_date" content="#contenttext#" />
        expires: { selector: getTagSelector("meta", "expires"), attr: "content" }, // <meta name="expires" content="#contenttext#" />
        revised: { selector: getTagSelector("meta", "revised"), attr: "content" }, // <meta name="revised" content="#contenttext#" />
        revisitAfter: {
            selector: getTagSelector("meta", "revisit-after"),
            attr: "content",
        }, // <meta name="revisit-after" content="#contenttext#" />
    },
    robots: {
        robots: { selector: getTagSelector("meta", "robots"), attr: "content" }, // <meta name="robots" content="#contenttext#" />
        googlebot: {
            selector: getTagSelector("meta", "googlebot"),
            attr: "content",
        }, // <meta name="googlebot" content="#contenttext#" />
    },
    contact: {
        openGraphPhoneNumber: {
            selector: getTagSelector("meta", "date"),
            attr: "content",
        }, // <meta name="og:phone_number" content="#contenttext#" />
        openGraphEmail: {
            selector: getTagSelector("meta", "presdate"),
            attr: "content",
        }, // <meta name="og:email" content="#contenttext#" />
        replyTo: {
            selector: getTagSelector("meta", "search_date"),
            attr: "content",
        }, // <meta name="reply-to" content="#contenttext#" />
        openGraphFaxNumber: {
            selector: getTagSelector("meta", "creation_date"),
            attr: "content",
        }, // <meta name="og:fax_number" content="#contenttext#" />
        contactPhoneNumber: {
            selector: getTagSelector("meta", "expires"),
            attr: "content",
        }, // <meta name="contactPhoneNumber" content="#contenttext#" />
        contactFaxNumber: {
            selector: getTagSelector("meta", "revised"),
            attr: "content",
        }, // <meta name="contactFaxNumber" content="#contenttext#" />
        contactNetworkAddress: {
            selector: getTagSelector("meta", "revisit-after"),
            attr: "content",
        }, // <meta name="contactNetworkAddress" content="#contenttext#" />
    },
    language: {
        language: { selector: getTagSelector("meta", "language"), attr: "content" }, // <meta name="language" content="#contenttext#" />
        contentLanguage: {
            selector: getTagSelector("meta", "content-language"),
            attr: "content",
        }, // <meta name="content-language" content="#contenttext#" />
        dublinCoreLanguage: {
            selector: getTagSelector("meta", "dc.language"),
            attr: "content",
        }, // <meta name="dc.language" content="#contenttext#" />
    },
    localization: {
        openGraphStreetAddress: {
            selector: getTagSelector("meta", "og:street-address"),
            attr: "content",
        }, // <meta name="og:street-address" content="#contenttext#" />
        openGraphPostalCode: {
            selector: getTagSelector("meta", "og:postal-code"),
            attr: "content",
        }, // <meta name="og:postal-code" content="#contenttext#" />
        openGraphRegion: {
            selector: getTagSelector("meta", "og:region"),
            attr: "content",
        }, // <meta name="og:region" content="#contenttext#" />
        openGraphLocality: {
            selector: getTagSelector("meta", "og:locality"),
            attr: "content",
        }, // <meta name="og:locality" content="#contenttext#" />
        openGraphCountryName: {
            selector: getTagSelector("meta", "og:country-name"),
            attr: "content",
        }, // <meta name="og:country-name" content="#contenttext#" />
        contactOrganization: {
            selector: getTagSelector("meta", "contactOrganization"),
            attr: "content",
        }, // <meta name="contactOrganization" content="#contenttext#" />
        contactStreetAddress1: {
            selector: getTagSelector("meta", "contactStreetAddress1"),
            attr: "content",
        }, // <meta name="contactStreetAddress1" content="#contenttext#" />
        contactZipcode: {
            selector: getTagSelector("meta", "contactZipcode"),
            attr: "content",
        }, // <meta name="contactZipcode" content="#contenttext#" />
        contactCity: {
            selector: getTagSelector("meta", "contactCity"),
            attr: "content",
        }, // <meta name="contactCity" content="#contenttext#" />
        contactCountry: {
            selector: getTagSelector("meta", "contactCountry"),
            attr: "content",
        }, // <meta name="contactCountry" content="#contenttext#" />
        icbm: { selector: getTagSelector("meta", "icbm"), attr: "content" }, // <meta name="icbm" content="#contenttext#" />
        geoPlacename: {
            selector: getTagSelector("meta", "geo.placename"),
            attr: "content",
        }, // <meta name="geo.placename" content="#contenttext#" />
        geoPosition: {
            selector: getTagSelector("meta", "geo.position"),
            attr: "content",
        }, // <meta name="geo.position" content="#contenttext#" />
        geoRegion: {
            selector: getTagSelector("meta", "geo.region"),
            attr: "content",
        }, // <meta name="geo.region" content="#contenttext#" />
        openGraphLocale: {
            selector: getTagSelector("meta", "og:locale"),
            attr: "content",
        }, // <meta name="og:locale" property="og:locale" content="#contenttext#" />
        openGraphLocaleAlternate: {
            selector: getTagSelector("meta", "og:locale:alternate"),
            attr: "content",
        }, // <meta property="og:locale:alternate" content="#contenttext#" />
        openGraphLongitude: {
            selector: getTagSelector("meta", "og:longitude"),
            attr: "content",
        }, // <meta name="og:longitude" content="#contenttext#" />
        openGraphLatitude: {
            selector: getTagSelector("meta", "og:latitude"),
            attr: "content",
        }, // <meta name="og:latitude" content="#contenttext#" />
        placeLocationLatitude: {
            selector: getTagSelector("meta", "place:location:latitude"),
            attr: "content",
        }, // <meta property="place:location:latitude" content="#contenttext#" />
        placeLocationLongitude: {
            selector: getTagSelector("meta", "place:location:longitude"),
            attr: "content",
        }, // <meta property="place:location:longitude" content="#contenttext#" />
    },
    image: {
        image: { selector: getTagSelector("meta", "image"), attr: "content" }, // <meta name="image" itemprop="image" content="#contenttext#" />
        openGraphImage: {
            selector: getTagSelector("meta", "og:image"),
            attr: "content",
        }, // <meta name="og:image" property="og:image" content="#contenttext#" />
        openGraphImageAlt: {
            selector: getTagSelector("meta", "og:image:alt"),
            attr: "content",
        }, // <meta property="og:image:alt" content="#contenttext#" />
        openGraphImageType: {
            selector: getTagSelector("meta", "og:image:type"),
            attr: "content",
        }, // <meta property="og:image:type" content="#contenttext#" />
        openGraphImageWidth: {
            selector: getTagSelector("meta", "og:image:width"),
            attr: "content",
        }, // <meta property="og:image:width" content="#contenttext#" />
        openGraphImageHeight: {
            selector: getTagSelector("meta", "og:image:height"),
            attr: "content",
        }, // <meta property="og:image:height" content="#contenttext#" />
        openGraphImageSecureUrl: {
            selector: getTagSelector("meta", "og:image:secure_url"),
            attr: "content",
        }, // <meta property="og:image:secure_url" content="#contenttext#" />
    },
    icon: {
        icon: { selector: getTagSelector("link", "icon"), attr: "href" }, // <link rel="icon" href="#hreflink#" sizes="#size#" />
        fluidIcon: { selector: getTagSelector("link", "fluid-icon"), attr: "href" }, // <link rel="fluid-icon" type="#mimetype#" />
        maskIcon: { selector: getTagSelector("link", "mask-icon"), attr: "href" }, // <link rel="mask-icon" href="#hreflink#" color="#color#" />
        shortcutIcon: {
            selector: getTagSelector("link", "shortcut icon"),
            attr: "href",
        }, // <link rel="shortcut icon" href="#hreflink#" type="#mimetype#" />
    },
    audio: {
        openGraphAudio: {
            selector: getTagSelector("meta", "og:audio"),
            attr: "content",
        }, // <meta property="og:audio" content="#contenttext#" />
        openGraphAudioAlbum: {
            selector: getTagSelector("meta", "og:audio:album"),
            attr: "content",
        }, // <meta property="og:audio:album" content="#contenttext#" />
        openGraphAudioArtist: {
            selector: getTagSelector("meta", "og:audio:artist"),
            attr: "content",
        }, // <meta property="og:audio:artist" content="#contenttext#" />
        openGraphAudioTtitle: {
            selector: getTagSelector("meta", "og:audio:title"),
            attr: "content",
        }, // <meta property="og:audio:title" content="#contenttext#" />
        openGraphAudioType: {
            selector: getTagSelector("meta", "og:audio:type"),
            attr: "content",
        }, // <meta property="og:audio:type" content="#contenttext#" />
        openGraphAudioSecure_url: {
            selector: getTagSelector("meta", "og:audio:secure_url"),
            attr: "content",
        }, // <meta property="og:audio:secure_url" content="#contenttext#" />
    },
    video: {
        openGraphVideo: {
            selector: getTagSelector("meta", "og:video"),
            attr: "content",
        }, // <meta name="og:video" property="og:video" content="#contenttext#" />
        openGraphVideoType: {
            selector: getTagSelector("meta", "og:video:type"),
            attr: "content",
        }, // <meta property="og:video:type" content="#contenttext#" />
        openGraphVideoHeight: {
            selector: getTagSelector("meta", "og:video:height"),
            attr: "content",
        }, // <meta property="og:video:height" content="#contenttext#" />
        openGraphVideoWidth: {
            selector: getTagSelector("meta", "og:video:width"),
            attr: "content",
        }, // <meta property="og:video:width" content="#contenttext#" />
        openGraphVideoSecure_url: {
            selector: getTagSelector("meta", "og:video:secure_url"),
            attr: "content",
        }, // <meta property="og:video:secure_url" content="#contenttext#" />
        videoActorId: {
            selector: getTagSelector("meta", "video:actor:id"),
            attr: "content",
        }, // <meta property="video:actor:id" content="#contenttext#" />
    },
    price: {
        ogPriceAmount: {
            selector: getTagSelector("meta", "og:price:amount"),
            attr: "content",
        }, // <meta name="og:price:amount" content="#contenttext#" />
        ogPriceCurrency: {
            selector: getTagSelector("meta", "og:price:currency"),
            attr: "content",
        }, // <meta name="og:price:currency" content="#contenttext#" />
    },
    article: {
        articleAuthor: {
            selector: getTagSelector("meta", "article:author"),
            attr: "content",
        }, // <meta name="article:author" content="#contenttext#" />
        articleModifiedTime: {
            selector: getTagSelector("meta", "article:modified_time"),
            attr: "content",
        }, // <meta name="article:modified_time" content="#contenttext#" />
        articlePublishedTime: {
            selector: getTagSelector("meta", "article:published_time"),
            attr: "content",
        }, // <meta name="article:published_time" content="#contenttext#" />
        articleSection: {
            selector: getTagSelector("meta", "article:section"),
            attr: "content",
        }, // <meta name="article:section" content="#contenttext#" />
        articleTag: {
            selector: getTagSelector("meta", "article:tag"),
            attr: "content",
        }, // <meta name="article:tag" content="#contenttext#" />
    },
    books: {
        booksAuthor: {
            selector: getTagSelector("meta", "books:author"),
            attr: "content",
        }, // <meta name="books:author" content="#contenttext#" />
        booksBook: {
            selector: getTagSelector("meta", "books:book"),
            attr: "content",
        }, // <meta name="books:book" content="#contenttext#" />
        booksCanonical_name: {
            selector: getTagSelector("meta", "books:canonical_name"),
            attr: "content",
        }, // <meta name="books:canonical_name" content="#contenttext#" />
        booksISBN: {
            selector: getTagSelector("meta", "books:isbn"),
            attr: "content",
        }, // <meta name="books:isbn" content="#contenttext#" />
        booksOfficialSite: {
            selector: getTagSelector("meta", "books:official_site"),
            attr: "content",
        }, // <meta name="books:official_site" content="#contenttext#" />
        booksRatingScale: {
            selector: getTagSelector("meta", "books:rating:scale"),
            attr: "content",
        }, // <meta name="books:rating:scale" content="#contenttext#" />
        booksRatingValue: {
            selector: getTagSelector("meta", "books:rating:value"),
            attr: "content",
        }, // <meta name="books:rating:value" content="#contenttext#" />
    },
    points: {
        openGraphPoints: {
            selector: getTagSelector("meta", "og:points"),
            attr: "content",
        }, // <meta name="og:points" content="#contenttext#" />
        gamePoints: {
            selector: getTagSelector("meta", "game:points"),
            attr: "content",
        }, // <meta name="game:points" content="#contenttext#" />
    },
    music: {
        musicAlbumURL: {
            selector: getTagSelector("meta", "music:album:url"),
            attr: "content",
        }, // <meta name="music:album:url" content="#contenttext#" />
        musicCreator: {
            selector: getTagSelector("meta", "music:creator"),
            attr: "content",
        }, // <meta name="music:creator" content="#contenttext#" />
        musicMusician: {
            selector: getTagSelector("meta", "music:musician"),
            attr: "content",
        }, // <meta name="music:musician" content="#contenttext#" />
        musicSongURL: {
            selector: getTagSelector("meta", "music:song:url"),
            attr: "content",
        }, // <meta name="music:song:url" content="#contenttext#" />
    },
    business: {
        businessContactDataCountryName: {
            selector: getTagSelector("meta", "business:contact_data:country_name"),
            attr: "content",
        }, // <meta name="business:contact_data:country_name" content="#contenttext#" />
        businessContactDataLocality: {
            selector: getTagSelector("meta", "business:contact_data:locality"),
            attr: "content",
        }, // <meta name="business:contact_data:locality" content="#contenttext#" />
        businessContactDataPostalCode: {
            selector: getTagSelector("meta", "business:contact_data:postal_code"),
            attr: "content",
        }, // <meta name="business:contact_data:postal_code" content="#contenttext#" />
        businessContactDataRegion: {
            selector: getTagSelector("meta", "business:contact_data:region"),
            attr: "content",
        }, // <meta name="business:contact_data:region" content="#contenttext#" />
        businessContactDataStreetAddress: {
            selector: getTagSelector("meta", "business:contact_data:street_address"),
            attr: "content",
        }, // <meta name="business:contact_data:street_address" content="#contenttext#" />
    },
    restaurant: {
        restaurantContactInfoCountryName: {
            selector: getTagSelector("meta", "restaurant:contact_info:country_name"),
            attr: "content",
        }, // <meta name="restaurant:contact_info:country_name" content="#contenttext#" />
        restaurantContactInfoEmail: {
            selector: getTagSelector("meta", "restaurant:contact_info:email"),
            attr: "content",
        }, // <meta name="restaurant:contact_info:email" content="#contenttext#" />
        restaurantContactInfoLocality: {
            selector: getTagSelector("meta", "restaurant:contact_info:locality"),
            attr: "content",
        }, // <meta name="restaurant:contact_info:locality" content="#contenttext#" />
        restaurantContactInfoPhone_number: {
            selector: getTagSelector("meta", "restaurant:contact_info:phone_number"),
            attr: "content",
        }, // <meta name="restaurant:contact_info:phone_number" content="#contenttext#" />
        restaurantContactInfoPostal_code: {
            selector: getTagSelector("meta", "restaurant:contact_info:postal_code"),
            attr: "content",
        }, // <meta name="restaurant:contact_info:postal_code" content="#contenttext#" />
        restaurantContactInfoRegion: {
            selector: getTagSelector("meta", "restaurant:contact_info:region"),
            attr: "content",
        }, // <meta name="restaurant:contact_info:region" content="#contenttext#" />
        restaurantContactInfoStreet_address: {
            selector: getTagSelector("meta", "restaurant:contact_info:street_address"),
            attr: "content",
        }, // <meta name="restaurant:contact_info:street_address" content="#contenttext#" />
        restaurantContactInfoWebsite: {
            selector: getTagSelector("meta", "restaurant:contact_info:website"),
            attr: "content",
        }, // <meta name="restaurant:contact_info:website" content="#contenttext#" />
        restaurantMenu: {
            selector: getTagSelector("meta", "restaurant:menu"),
            attr: "content",
        }, // <meta name="restaurant:menu" content="#contenttext#" />
        restaurantRestaurant: {
            selector: getTagSelector("meta", "restaurant:restaurant"),
            attr: "content",
        }, // <meta name="restaurant:restaurant" content="#contenttext#" />
        restaurantSection: {
            selector: getTagSelector("meta", "restaurant:section"),
            attr: "content",
        }, // <meta name="restaurant:section" content="#contenttext#" />
        restaurantVariationPriceAmount: {
            selector: getTagSelector("meta", "restaurant:variation:price:amount"),
            attr: "content",
        }, // <meta name="restaurant:variation:price:amount" content="#contenttext#" />
        restaurantVariationPriceCurrency: {
            selector: getTagSelector("meta", "restaurant:variation:price:currency"),
            attr: "content",
        }, // <meta name="restaurant:variation:price:currency" content="#contenttext#" />
    },
    product: {
        productAvailability: {
            selector: getTagSelector("meta", "product:availability"),
            attr: "content",
        }, // <meta name="product:availability" content="#contenttext#" />
        productCondition: {
            selector: getTagSelector("meta", "product:condition"),
            attr: "content",
        }, // <meta name="product:condition" content="#contenttext#" />
        productPriceAmount: {
            selector: getTagSelector("meta", "product:price:amount"),
            attr: "content",
        }, // <meta name="product:price:amount" content="#contenttext#" />
        productPriceCurrency: {
            selector: getTagSelector("meta", "product:price:currency"),
            attr: "content",
        }, // <meta name="product:price:currency" content="#contenttext#" />
        productRetailerItemId: {
            selector: getTagSelector("meta", "product:retailer_item_id"),
            attr: "content",
        }, // <meta name="product:retailer_item_id" content="#contenttext#" />
    },
    screen: {
        formatDetection: {
            selector: getTagSelector("meta", "format-detection"),
            attr: "content",
        }, // <meta name="format-detection" content="#contenttext#" />
        fullScreen: {
            selector: getTagSelector("meta", "full-screen"),
            attr: "content",
        }, // <meta name="full-screen" content="#contenttext#" />
        screenOrientation: {
            selector: getTagSelector("meta", "screen-orientation"),
            attr: "content",
        }, // <meta name="screen-orientation" content="#contenttext#" />
        browsermode: {
            selector: getTagSelector("meta", "browsermode"),
            attr: "content",
        }, // <meta name="browsermode" content="#contenttext#" />
        imagemode: {
            selector: getTagSelector("meta", "imagemode"),
            attr: "content",
        }, // <meta name="imagemode" content="#contenttext#" />
        layoutmode: {
            selector: getTagSelector("meta", "layoutmode"),
            attr: "content",
        }, // <meta name="layoutmode" content="#contenttext#" />
        nightmode: {
            selector: getTagSelector("meta", "nightmode"),
            attr: "content",
        }, // <meta name="nightmode" content="#contenttext#" />
        x5Fullscreen: {
            selector: getTagSelector("meta", "x5-fullscreen"),
            attr: "content",
        }, // <meta name="x5-fullscreen" content="#contenttext#" />
        x5Orientation: {
            selector: getTagSelector("meta", "x5-orientation"),
            attr: "content",
        }, // <meta name="x5-orientation" content="#contenttext#" />
        x5PageMode: {
            selector: getTagSelector("meta", "x5-page-mode"),
            attr: "content",
        }, // <meta name="x5-page-mode" content="#contenttext#" />
        HandheldFriendly: {
            selector: getTagSelector("meta", "HandheldFriendly"),
            attr: "content",
        }, // <meta name="HandheldFriendly" content="#contenttext#" />
        MobileOptimized: {
            selector: getTagSelector("meta", "MobileOptimized"),
            attr: "content",
        }, // <meta name="MobileOptimized" content="#contenttext#" />
    },
};
