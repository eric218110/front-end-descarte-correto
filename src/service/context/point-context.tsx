import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react'
import {
  addPointApi,
  AddPointsProps,
  ResponseAddPointsProps,
  getPointsApi
} from '../api/points'
import { Point } from '../domain/point'

interface PointContextProps extends Omit<Point, 'account'> {
  account: {
    id: string
    email: string
    name: string
  }
}

type PointContextData = {
  points: PointContextProps[]
  addPoint: (pointData: AddPointsProps) => Promise<ResponseAddPointsProps>
}

const PointContext = createContext<PointContextData>({} as PointContextData)

export const PointProvider = ({
  children
}: {
  children: JSX.Element
}): JSX.Element => {
  const [points, setPoints] = useState<PointContextProps[]>([])

  useEffect(() => {
    async function getPoints() {
      const points = await getPointsApi()
      setPoints(points)
    }
    getPoints()
  }, [])

  const addPoint = useCallback(
    async (pointData: AddPointsProps): Promise<ResponseAddPointsProps> => {
      const { data, error } = await addPointApi(pointData)

      if (!error) {
        const points = await getPointsApi()
        setPoints(points)
      }
      return { data, error }
    },
    [points]
  )

  return (
    <PointContext.Provider
      value={{
        points,
        addPoint
      }}
    >
      {children}
    </PointContext.Provider>
  )
}

export function usePointContext(): PointContextData {
  return useContext(PointContext)
}
