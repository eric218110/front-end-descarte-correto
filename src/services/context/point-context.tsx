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
  getPointsApi,
  ResponseListPoints,
  getPointsFilterApi
} from '../api/points'
import { Point } from '../domain/point'

interface PointContextProps extends Omit<Point, 'account'> {
  account: {
    id: string
    email: string
    name: string
  }
}

export type ResponseLoadPoints = {
  data: ResponseListPoints[]
  error: string
}

type idsItemProps = {
  ids: string
}

type PointContextData = {
  loadPoints: (ids: idsItemProps) => Promise<ResponseLoadPoints>
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

  const loadPoints = useCallback(
    async ({ ids }: idsItemProps): Promise<ResponseLoadPoints> => {
      if (ids.length === 0) {
        const points = await getPointsApi()
        return {
          data: points,
          error: ''
        }
      }
      if (ids.length >= 1) {
        const points = await getPointsFilterApi({ ids })
        return {
          data: points,
          error: ''
        }
      }
      return {
        data: [],
        error: 'No load points'
      }
    },
    [points]
  )

  return (
    <PointContext.Provider
      value={{
        loadPoints,
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
