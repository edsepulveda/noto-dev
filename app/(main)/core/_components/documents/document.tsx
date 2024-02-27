

interface Document {
  id: string,
  title: string
}

interface Props {
  document: Document
}


export default function Documents({ document }: Props){
  return <p>{document.title}</p>
}