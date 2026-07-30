import AppBarActions from "@/components/AppBar/AppBarActions";

export default function () {

  return (
    <AppBarActions>
      <div className="grid items-center grid-cols-[1fr_auto_1fr]">
        <div />
        <h1 className="text-2xl font-bold">Settings</h1>
        <div />
        {/* <div className="flex justify-end"> */}
        {/* </div> */}
      </div>
    </AppBarActions>
  )
}
