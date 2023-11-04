import type { Context, JobOffer } from "#root/bot/context.js";
import {
  getNoString,
  getNotDefinedString,
} from "#root/bot/helpers/translations.js";
import { getGroup } from "#root/bot/helpers/database.js";
import { DEFAULT_LOCALE, i18n } from "#root/bot/i18n.js";

type Contexts = {
  role: string | undefined;
  description: string | undefined;
  ral: string | undefined;
  isRemote: boolean;
  cities: Array<string> | undefined;
  benefits: Array<string> | undefined;
  link: string;
  linkText?: string;
};

const shapeJobOffer = (
  {
    role,
    description,
    ral,
    isRemote,
    cities,
    benefits,
    link,
    linkText,
  }: Contexts,
  ctx: Context,
  localeCode: string,
): JobOffer => ({
  role: role ?? getNotDefinedString(ctx),
  description: description ?? getNotDefinedString(ctx),
  ral: ral ?? getNotDefinedString(ctx),
  isRemote: isRemote
    ? i18n.t(localeCode, "general.yes")
    : i18n.t(localeCode, "general.no"),
  cities,
  benefits,
  link,
  linkText,
});

export const buildJobOffer = async (
  joContexts: Contexts,
  ctx: Context,
  groupId: number,
) => {
  const group = await getGroup(groupId);

  const localeCode = group?.language ?? DEFAULT_LOCALE;

  const jobOffer = shapeJobOffer(joContexts, ctx, localeCode);
  const hasCities = jobOffer.isRemote === getNoString(ctx);
  const hasBenefits = jobOffer.benefits;

  const cities = `<b>[${i18n.t(localeCode, "jobOffer.cities")}]</b>

${
  hasCities
    ? jobOffer.cities?.map((c) => `#${c}`).join(", ")
    : i18n.t(localeCode, "general.notApplicable")
}`;

  const benefits = `<b>[${i18n.t(localeCode, "jobOffer.benefits")}]</b>

${
  hasBenefits
    ? jobOffer.benefits?.join(", ")
    : i18n.t(localeCode, "general.notApplicable")
}`;

  return `<b>[${i18n.t(localeCode, "jobOffer.role")}]</b>

${jobOffer.role}

<b>[${i18n.t(localeCode, "jobOffer.description")}]</b>

${jobOffer.description}

<b>[${i18n.t(localeCode, "jobOffer.ral")}]</b>

${jobOffer.ral}

<b>[${i18n.t(localeCode, "jobOffer.isRemote")}]</b>

${jobOffer.isRemote}

${cities}

${benefits}

<b>[${i18n.t(localeCode, "jobOffer.link")}]</b>

<a href="${jobOffer.link}">${
    jobOffer.linkText ?? i18n.t(localeCode, "jobOffer.link")
  }</a>
  `;
};
