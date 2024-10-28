import { useRouter } from "next/router";
import useSWR, { mutate } from "swr";
import Form from "../../../components/Form";
import { StyledLink } from "../../../components/StyledLink";

export default function EditPage() {
  const router = useRouter();
  const { isReady } = router;
  const { id } = router.query;
  const { data: place, isLoading, error } = useSWR(`/api/places/${id}`);

  async function editPlace(editPlace) {
    console.log(editPlace);

    const response = await fetch(`/api/places/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editPlace),
    });

    if (response.ok) {
      const updatedPlace = await response.json();
      mutate(
        `/api/places/${id}`,
        (data) => ({
          ...data,
          ...updatedPlace,
        }),
        false
      );
      router.push(`/`);
    } else {
      console.error("Failed to edit place", response.statusText);
    }
    console.log("Editing place ...");
  }

  if (!isReady || isLoading || error) return <h2>Loading...</h2>;

  return (
    <>
      <h2 id="edit-place">Edit Place</h2>
      <StyledLink href={`/places/${id}`} $justifySelf="start">
        back
      </StyledLink>
      <Form onSubmit={editPlace} formName={"edit-place"} defaultData={place} />
    </>
  );
}
