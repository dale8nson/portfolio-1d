import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  const blob = await fetch("https://www.youtube.com/2056ecf9-670d-45a2-853e-7df591c7126d").then(res => res.blob())

  const url = URL.createObjectURL(blob)

  return NextResponse.json({url})
}
