import { PapersDTO } from "../http/papers/dto/papers.dto";

 const platforms = [
          { id: 1, name: "Windows", description: "Description A" },
          { id: 2, name: "Linux", description: "Description B" },
          { id: 3, name: "Mac", description: "Description C" },
          { id: 4, name: "Void Linux", description: "Description D" },
          { id: 5, name: "Pop Os", description: "Description E" },
          { id: 6, name: "Android", description: "Description F" },
        ]

export const PapersColumns = [
  {
    title: "Data",
    render: (item: PapersDTO) =>
      new Date(item.createdAt).toLocaleDateString("pt-BR"),
  },
  {
    title: "Título",
    render: (item: PapersDTO) => item.title,
  },
  {
    title: "Plataforma",
    render: (item: PapersDTO) => platforms.find((p) => p.id === item.platformId)?.name || "-",
  },
  {
    title: "Linguagem",
    render: (item: PapersDTO) => item.language,
  },

  {
    title: "Paper Download",
    render: (item: PapersDTO) => (
      <>
        {item.documentPath ? (<a
          href={`/api/upload/${item.documentPath}`}
          download
          className="text-blue-600 hover:underline"
        >
          Baixar arquivo
        </a>) : " - "}

      </>
    )
  },
    {
    title: "Autor",
    render: (item: PapersDTO) => item.user.name || "-",
  },
];
