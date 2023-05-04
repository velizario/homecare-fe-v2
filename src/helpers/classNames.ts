type TStringFalsy = string | undefined | false | null

export default function classNames(...classes:TStringFalsy[]) {
    return classes.filter(Boolean).join(' ')
  }